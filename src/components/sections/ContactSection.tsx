"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  Send,
  Mail,
  Phone,
  Copy,
  Check,
  Sparkles,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/common/Icons";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full Cross-Platform App (iOS & Android)",
    message: "",
  });
  const [faxNumber, setFaxNumber] = useState(""); // Honeypot trap for spambots
  const mountedTimeRef = React.useRef<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    mountedTimeRef.current = Date.now();
  }, []);

  const handleCopy = async (text: string, type: "email" | "phone") => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      // Graceful fallback if clipboard permission is denied
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType.trim(),
        message: formData.message.trim(),
        fax_number: faxNumber, // Honeypot check
        _t: mountedTimeRef.current,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Transmission failed. Please try again or email Jayesh directly.",
        );
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        projectType: "Full Cross-Platform App (iOS & Android)",
        message: "",
      });
      setFaxNumber("");
    } catch (err: unknown) {
      console.error("Contact Form Error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please contact Jayesh directly via email.",
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  const directMailtoUrl = `mailto:${portfolioData.profile.email}?subject=${encodeURIComponent(
    `[Freelance Inquiry] ${formData.projectType || "Mobile App Project"} from ${formData.name || "Client"}`,
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.projectType}\n\nMessage:\n${formData.message}`,
  )}`;

  return (
    <section
      id="contact"
      className="section-deferred scroll-mt-24 md:scroll-mt-28 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28"
    >
      {/* Section Header */}
      <SectionHeader
        badge="Direct Transmission"
        terminalCommand="nc -vz contact.jayesh.purohit 443"
        title="Initialize"
        highlightText="Connection."
        description="Have an upcoming mobile app project, performance audit, or contract requirement? Transmit your project details below or ping directly."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Terminal Contact Form (Col 7) */}
        <div className="lg:col-span-7 glass-panel p-4 sm:p-6 md:p-8 rounded-xl border border-[#434656] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2e5bff]/5 via-transparent to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#434656] font-mono text-xs text-[#c4c5d9]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#2e5bff]" />
                <span className="text-[#b8c3ff] font-bold">
                  transmission_payload.ts
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f8fafc]/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
              </div>
            </div>

            {status === "success" ? (
              <div className="py-8 px-4 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/50 flex items-center justify-center text-[#22c55e] mb-2 shadow-lg shadow-[#22c55e]/10">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#22c55e]/10 border border-[#22c55e]/30 text-xs font-mono text-[#22c55e]">
                  <span>HTTP 200: TRANSMISSION DELIVERED</span>
                </div>
                <h3 className="font-sora text-xl sm:text-2xl font-bold text-[#d8e3fb]">
                  Message Successfully Transmitted!
                </h3>
                <p className="text-sm text-[#c4c5d9] max-w-md leading-relaxed">
                  Your inquiry has been dispatched to{" "}
                  <strong className="text-[#b8c3ff] font-mono">
                    jayesh.purohit.yt@gmail.com
                  </strong>
                  . Jayesh will review your specifications and respond within
                  12–24 hours.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="btn-outline text-xs py-2 px-4 flex items-center gap-2 cursor-pointer hover:border-[#2e5bff]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Transmission</span>
                  </button>
                  <a
                    href="https://wa.me/917354360460"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Instant WhatsApp Ping &rarr;</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot Trap (Hidden from users, catches automated spam bots) */}
                <div
                  style={{
                    display: "none",
                    opacity: 0,
                    position: "absolute",
                    left: "-9999px",
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="contact-fax-field">
                    Do not fill this field
                  </label>
                  <input
                    id="contact-fax-field"
                    type="text"
                    name="fax_number"
                    tabIndex={-1}
                    autoComplete="off"
                    value={faxNumber}
                    onChange={(e) => setFaxNumber(e.target.value)}
                  />
                </div>
                {status === "error" && errorMessage && (
                  <div className="p-3.5 rounded-lg bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 text-xs text-[#ffb4ab] flex items-start gap-2.5 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span>{errorMessage}</span>
                      <a
                        href={directMailtoUrl}
                        className="underline hover:text-white font-bold"
                      >
                        Click here to send directly via your email client &rarr;
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-client-name"
                      className="block font-mono text-xs text-[#b8c3ff] mb-1.5"
                    >
                      var clientName =
                    </label>
                    <input
                      id="contact-client-name"
                      type="text"
                      required
                      disabled={status === "submitting"}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="'Sarah Connor'"
                      className="w-full bg-[#081425] border border-[#434656] rounded-md px-3.5 py-2.5 text-sm text-[#d8e3fb] font-mono focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] focus:outline-none transition-all placeholder:text-[#45464e] disabled:opacity-50"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-client-email"
                      className="block font-mono text-xs text-[#b8c3ff] mb-1.5"
                    >
                      var clientEmail =
                    </label>
                    <input
                      id="contact-client-email"
                      type="email"
                      required
                      disabled={status === "submitting"}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="'sarah@techstartup.com'"
                      className="w-full bg-[#081425] border border-[#434656] rounded-md px-3.5 py-2.5 text-sm text-[#d8e3fb] font-mono focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] focus:outline-none transition-all placeholder:text-[#45464e] disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div>
                  <label
                    htmlFor="contact-project-scope"
                    className="block font-mono text-xs text-[#b8c3ff] mb-1.5"
                  >
                    const scope =
                  </label>
                  <select
                    id="contact-project-scope"
                    aria-label="Select Project Scope or Engagement Model"
                    disabled={status === "submitting"}
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full bg-[#081425] border border-[#434656] rounded-md px-3.5 py-2.5 text-sm text-[#d8e3fb] font-mono focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] focus:outline-none transition-all disabled:opacity-50"
                  >
                    <option value="Full Cross-Platform App (iOS & Android)">
                      Full Cross-Platform App (iOS & Android)
                    </option>
                    <option value="React Native Performance / Battery Audit">
                      React Native Performance / Battery Audit
                    </option>
                    <option value="Native Swift / Kotlin Module Bridge">
                      Native Swift / Kotlin Module Bridge
                    </option>
                    <option value="Full-Time / Part-Time Remote Contract">
                      Full-Time / Part-Time Remote Contract
                    </option>
                    <option value="Other Architecture Inquiries">
                      Other Architecture Inquiries
                    </option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-project-specs"
                    className="block font-mono text-xs text-[#b8c3ff] mb-1.5"
                  >
                    const projectSpecs =
                  </label>
                  <textarea
                    id="contact-project-specs"
                    rows={4}
                    required
                    disabled={status === "submitting"}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your app goals, timeline, and key requirements..."
                    className="w-full bg-[#081425] border border-[#434656] rounded-md px-3.5 py-2.5 text-sm text-[#d8e3fb] font-mono focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] focus:outline-none transition-all placeholder:text-[#45464e] resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-primary py-3.5 text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#b8c3ff]" />
                      <span>Transmitting via Resend...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Transmit Request (Send Direct)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#434656]/50 font-mono text-[11px] text-[#8e90a2] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2e5bff]" />
            <span>
              Average initial response time: &lt; 12 hours (Worldwide coverage)
            </span>
          </div>
        </div>

        {/* Direct Channels (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Direct Ping Card */}
          <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-xl border border-[#434656] flex flex-col gap-6">
            <div>
              <h3 className="font-sora text-xl font-bold text-[#d8e3fb] mb-1">
                Direct Communication
              </h3>
              <p className="font-mono text-xs text-[#c4c5d9]">
                One-click direct contact channels
              </p>
            </div>

            {/* Email Box */}
            <div className="p-4 rounded-lg bg-[#081425] border border-[#434656] flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded bg-[#1f2a3c] text-[#b8c3ff]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-[#8e90a2] uppercase">
                    Email Channel
                  </div>
                  <a
                    href={`mailto:${portfolioData.profile.email}`}
                    className="text-xs sm:text-sm font-mono text-[#d8e3fb] hover:text-[#b8c3ff] transition-colors truncate block"
                  >
                    {portfolioData.profile.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(portfolioData.profile.email, "email")}
                className="p-2 rounded hover:bg-[#1f2a3c] text-[#c4c5d9] hover:text-[#b8c3ff] transition-colors border border-transparent hover:border-[#434656]"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-[#22c55e]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Box */}
            <div className="p-4 rounded-lg bg-[#081425] border border-[#434656] flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#1f2a3c] text-[#b8c3ff]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8e90a2] uppercase">
                    Direct / WhatsApp
                  </div>
                  <a
                    href={`tel:${portfolioData.profile.phone}`}
                    className="text-xs sm:text-sm font-mono text-[#d8e3fb] hover:text-[#b8c3ff] transition-colors"
                  >
                    {portfolioData.profile.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(portfolioData.profile.phone, "phone")}
                className="p-2 rounded hover:bg-[#1f2a3c] text-[#c4c5d9] hover:text-[#b8c3ff] transition-colors border border-transparent hover:border-[#434656]"
                title="Copy Phone"
              >
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-[#22c55e]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Social Grid */}
            <div className="pt-2">
              <div className="text-xs font-mono text-[#8e90a2] uppercase mb-3">
                Professional Profiles
              </div>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={portfolioData.profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#081425] border border-[#434656] hover:border-[#2e5bff] text-xs font-mono text-[#d8e3fb] hover:text-[#b8c3ff] flex flex-col items-center gap-2 transition-all group"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#b8c3ff] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={portfolioData.profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#081425] border border-[#434656] hover:border-[#2e5bff] text-xs font-mono text-[#d8e3fb] hover:text-[#b8c3ff] flex flex-col items-center gap-2 transition-all group"
                >
                  <GithubIcon className="w-4 h-4 text-[#b8c3ff] group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </a>

                <a
                  href={portfolioData.profile.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#081425] border border-[#434656] hover:border-[#2e5bff] text-xs font-mono text-[#d8e3fb] hover:text-[#b8c3ff] flex flex-col items-center gap-2 transition-all group"
                >
                  <TwitterIcon className="w-4 h-4 text-[#b8c3ff] group-hover:scale-110 transition-transform" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Timezone / Global Availability Badge */}
          <div className="glass-panel p-5 rounded-xl border border-[#434656] text-xs font-mono text-[#c4c5d9] flex items-center justify-between">
            <div>
              <span className="text-[#b8c3ff] font-bold">
                GLOBAL TIMEZONE COMPLIANCE:
              </span>
              <p className="text-[11px] text-[#8e90a2] mt-0.5">
                EST / PST / GMT / IST Active Work Hours
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#22c55e] animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
