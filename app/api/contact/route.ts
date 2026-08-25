import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// --- Rate Limiting Configuration (Sliding Window in Memory) ---
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 4; // Max 4 submissions per IP per 10 mins

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up stale rate-limit records every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, record] of ipRequestMap.entries()) {
      if (now > record.resetTime) {
        ipRequestMap.delete(ip);
      }
    }
  },
  5 * 60 * 1000,
).unref();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true };
}

// --- Sanitization & Security Utilities ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stripCrlf(str: string): string {
  return str.replace(/[\r\n]/g, " ").trim();
}

function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  if (!origin) {
    const referer = req.headers.get("referer");
    if (!referer) return true;
    try {
      const refUrl = new URL(referer);
      return (
        refUrl.host === host ||
        refUrl.hostname === "localhost" ||
        refUrl.hostname === "127.0.0.1" ||
        refUrl.hostname.startsWith("192.168.")
      );
    } catch {
      return false;
    }
  }

  try {
    const originUrl = new URL(origin);
    return (
      originUrl.host === host ||
      originUrl.hostname === "localhost" ||
      originUrl.hostname === "127.0.0.1" ||
      originUrl.hostname.startsWith("192.168.") ||
      originUrl.hostname.endsWith("jayeshpurohit.dev") ||
      originUrl.hostname.endsWith("vercel.app")
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate Origin / CSRF Protection
    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        {
          error: "Forbidden: Cross-origin request blocked by security policy.",
        },
        { status: 403 },
      );
    }

    // 2. Enforce Payload Size Limit (Max 25 KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 25000) {
      return NextResponse.json(
        { error: "Payload Too Large: Message exceeds size limit." },
        { status: 413 },
      );
    }

    // 3. Enforce Rate Limiting (Max 4 requests per 10 minutes per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please wait ${rateLimit.retryAfterSeconds} seconds before sending another message.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": (rateLimit.retryAfterSeconds || 60).toString(),
          },
        },
      );
    }

    const body = await req.json();
    const { name, email, projectType, message, fax_number, _t } = body;

    // 4. Honeypot Bot Trap: If hidden honeypot field is filled, silently succeed without sending email
    if (fax_number) {
      console.warn(`[Security Alert] Bot trap triggered by IP: ${clientIp}`);
      return NextResponse.json(
        { success: true, message: "Transmission received." },
        { status: 200 },
      );
    }

    // 5. Bot Speed Trap: Minimum time to submit (reject submissions < 1200ms)
    if (_t && typeof _t === "number") {
      const timeElapsed = Date.now() - _t;
      if (timeElapsed < 1200) {
        return NextResponse.json(
          { error: "Submission rejected: Request completed too quickly." },
          { status: 429 },
        );
      }
    }

    // 6. Strict Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 },
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email ? email.toString().trim() : "";
    if (
      !trimmedEmail ||
      !emailRegex.test(trimmedEmail) ||
      trimmedEmail.length > 150
    ) {
      return NextResponse.json(
        {
          error: "Please provide a valid email address (e.g. user@domain.com).",
        },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        {
          error:
            "Please provide a detailed project message (at least 5 characters).",
        },
        { status: 400 },
      );
    }

    // 7. Data Sanitization & Header Injection Defense (Strip CRLF)
    const sanitizedName = stripCrlf(name.slice(0, 100));
    const sanitizedEmail = stripCrlf(trimmedEmail.slice(0, 150));
    const sanitizedScope = stripCrlf(
      (projectType || "General Inquiry").toString().slice(0, 100),
    );
    const sanitizedMessage = message.trim().slice(0, 3000);

    // 8. Resend Service Check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "RESEND_API_KEY is not configured in environment variables.",
      );
      return NextResponse.json(
        {
          error:
            "Email service is not configured yet. Please configure RESEND_API_KEY in .env.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "jayesh.purohit.yt@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>";

    const dateStr = new Date().toUTCString();

    // 9. XSS-Safe HTML Template (All user variables escaped via escapeHtml)
    const safeNameHtml = escapeHtml(sanitizedName);
    const safeEmailHtml = escapeHtml(sanitizedEmail);
    const safeScopeHtml = escapeHtml(sanitizedScope);
    const safeMessageHtml = escapeHtml(sanitizedMessage);
    const safeIp = escapeHtml(clientIp);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08101e; color: #d8e3fb; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #121c2e; border: 1px solid #28374d; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #182844 0%, #0d1a2f 100%); padding: 24px; border-bottom: 1px solid #28374d; }
    .badge { display: inline-block; background-color: rgba(46, 91, 255, 0.2); color: #b8c3ff; border: 1px solid rgba(46, 91, 255, 0.5); border-radius: 4px; padding: 4px 8px; font-size: 11px; font-family: monospace; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; }
    .title { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .body { padding: 24px; }
    .field-row { margin-bottom: 16px; }
    .label { font-size: 11px; font-family: monospace; text-transform: uppercase; color: #8e9cb5; margin-bottom: 4px; }
    .value { font-size: 15px; color: #f1f5f9; font-weight: 500; }
    .message-box { background-color: #08101e; border: 1px solid #1f2c42; border-radius: 8px; padding: 16px; margin-top: 20px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0; word-break: break-word; }
    .footer { padding: 16px 24px; background-color: #0d1728; border-top: 1px solid #28374d; font-size: 11px; color: #64748b; font-family: monospace; display: flex; justify-content: space-between; }
    .btn { display: inline-block; background-color: #2e5bff; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">🚀 Verified Portfolio Inquiry</span>
      <h1 class="title">New Client Transmission</h1>
    </div>
    <div class="body">
      <div class="field-row">
        <div class="label">Client / Sender Name:</div>
        <div class="value">${safeNameHtml}</div>
      </div>
      <div class="field-row">
        <div class="label">Email Address:</div>
        <div class="value"><a href="mailto:${safeEmailHtml}" style="color: #60a5fa; text-decoration: none;">${safeEmailHtml}</a></div>
      </div>
      <div class="field-row">
        <div class="label">Project Scope / Engagement:</div>
        <div class="value">${safeScopeHtml}</div>
      </div>
      <div class="field-row">
        <div class="label">Message & Specifications:</div>
        <div class="message-box">${safeMessageHtml}</div>
      </div>
      <a href="mailto:${safeEmailHtml}?subject=Re: [Freelance Inquiry] ${encodeURIComponent(sanitizedScope)}" class="btn">Reply to ${safeNameHtml} &rarr;</a>
    </div>
    <div class="footer">
      <span>Transmitted via Portfolio &bull; ${dateStr}</span>
      <span>Origin IP: ${safeIp}</span>
    </div>
  </div>
</body>
</html>
    `.trim();

    const textContent = `
New Client Inquiry via Jayesh Purohit Portfolio:

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Scope: ${sanitizedScope}
Date: ${dateStr}
Origin IP: ${clientIp}

Message:
${sanitizedMessage}
    `.trim();

    // 10. Send through Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: sanitizedEmail,
      subject: `[Portfolio Inquiry] ${sanitizedScope} from ${sanitizedName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to deliver email via Resend." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message successfully transmitted to Jayesh!",
        id: data?.id,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error("Contact API Exception:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
