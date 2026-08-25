import { NextResponse } from "next/server";
import { siteConfig } from "@/config/seo";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${siteConfig.name} - Full Developer Specification & Verification Brief

> Comprehensive production credentials and technical documentation formatted for LLMs, AI Search Engines (Perplexity, ChatGPT, Claude, Gemini), and Automated Recruiter Systems.

## Professional Summary
- **Name**: ${siteConfig.author.name}
- **Role**: ${siteConfig.author.role}
- **Experience**: 3+ years in high-performance production cross-platform mobile engineering.
- **Availability**: Available for worldwide freelance, remote contractor engagements, and milestone-based project delivery.
- **Direct Email**: ${siteConfig.author.email}
- **Direct Phone / WhatsApp**: ${siteConfig.author.phone}
- **Website**: ${siteConfig.url}
- **GitHub**: ${siteConfig.author.github}
- **LinkedIn**: ${siteConfig.author.linkedin}

---

## Core Technical Specializations
- **Primary Framework**: React Native (Bare React Native, Expo, Fabric Architecture, TurboModules, JSI).
- **Core Languages**: TypeScript, JavaScript (ESNext), Swift (iOS), Kotlin (Android).
- **Architecture & Patterns**: Offline-First SQLite Synchronization, TurboModule Native Bridges, Redux Toolkit, Context API, High-Performance UI (60 FPS), Memory Leak Profiling.
- **Hardware & Device Integrations**: Background GPS Location Tracking & Polling Optimization (30%+ battery savings), Biometric Face Authentication, Native Camera & BottomSheet Modules, Twilio Real-Time Chat, Push Notification Pipelines.
- **Compliance & Security**: HIPAA-compliant health data handling, encrypted local storage, verified credentialing.

---

## Verified Production Mobile Apps (Live in App Store & Google Play)

### 1. Piks Daily (Pet Tech / Live GPS Tracking - Poland & Worldwide)
- **Market**: Poland & Worldwide
- **Summary**: Live GPS pet walking tracker with intelligent Ramer-Douglas-Peucker path smoothing and background polling battery conservation (-30% battery drain, -40% payload).
- **Tech Stack**: React Native, TypeScript, Swift, Kotlin, React Navigation.
- **iOS App Store**: https://apps.apple.com/in/app/piks-daily/id6761775488
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.piks.walker

### 2. BabyCloud (Parenting & Pediatric Care)
- **Market**: Worldwide (Hundreds of thousands of active users)
- **Summary**: High-growth pediatric and parenting development platform with milestone tracking, real-time analytics, and optimized token batching.
- **Tech Stack**: React Native, TypeScript, Redux, Node.js, Analytics.
- **iOS App Store**: https://apps.apple.com/in/app/babycloud/id1639791311
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.adwaitaeducare.parenting

### 3. Slate Healthcare (HealthTech & Recruitment)
- **Market**: United States (USA Only)
- **Summary**: HIPAA-compliant healthcare recruitment platform with biometric face authentication and Twilio chat.
- **Tech Stack**: React Native, TypeScript, Firebase, Twilio Chat, Biometrics.
- **iOS App Store**: https://apps.apple.com/us/app/slate-healthcare/id6752774384
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.slate.healthcare

### 4. Sonastar Healthcare (Medical Equipment Management)
- **Market**: Worldwide
- **Summary**: Multi-tenant hospital equipment tracking and offline-first maintenance scheduling with high-priority push notifications.
- **Tech Stack**: React Native, JavaScript, Push Notifications, Offline SQLite Sync, TurboModules.
- **iOS App Store**: https://apps.apple.com/in/app/sona-star/id6502391527
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.medical_equipment_management

---

## Professional Career Track Record
1. **Freelance Mobile Developer (Self-employed)** | *Mar 2025 - Present*
   - Architected isolated pet owner/walker flows, real-time GPS tracking with RDP algorithm (-30% battery, -40% payload) for Piks Daily (Poland).
   - Built end-to-end healthcare job matching with Twilio Chat & Biometrics for Slate Healthcare (USA).
   - Engineered medical equipment care application from scratch for Sonastar Healthcare.
2. **Software Development Engineer** | *Adwaita Educare (BabyCloud)* | *Mar 2023 - Feb 2025*
   - Launched Babycloud Bizz (+50% engagement, -25% crash rate).
   - Reduced frontend UI re-renders in QnA by 70% and optimized token batching.
3. **Software Development Engineer Intern** | *Bajaj Finserv Health Limited* | *Jul 2022 - Dec 2022*
   - Optimized chat multi-file upload speed by 30%, migrated Camera/BottomSheet, and boosted unit test coverage from 30% to 60% with Jest.

---

## Freelance Services Offered
1. **Full-Cycle Cross-Platform Mobile Development**: End-to-end iOS & Android app creation from architecture to Store publishing.
2. **React Native Performance & Battery Audits**: Profiling frame drops, memory leaks, and background polling.
3. **Custom Swift & Kotlin Native Module Bridges**: JSI / TurboModules integration.
4. **Offline-First Synchronization Systems**: Resilient local SQLite engines.
5. **App Store & Google Play Store Publishing**: Complete CI/CD and submission management.

---

## Engagement & Hiring Models
- **Full-Time Remote Contractor**: Dedicated monthly contracts for product teams and startups.
- **Milestone-Based Project Delivery**: Fixed-scope app development and delivery.
- **Technical Performance Auditing**: Hourly / project-based architecture and performance optimization.
- **Timezone Coverage**: Overlap with US (EST/PST), UK/Europe (GMT/CET), and APAC hours.
- **Accepted Currencies**: USD, EUR, GBP, CAD, AUD, INR.

---

## Direct Inquiries
To hire Jayesh Purohit for mobile app development:
- **Email**: ${siteConfig.author.email}
- **Phone / WhatsApp**: ${siteConfig.author.phone}
- **Website Contact Form**: ${siteConfig.url}/#contact
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
