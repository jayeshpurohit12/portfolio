import { NextResponse } from "next/server";
import { siteConfig } from "@/config/seo";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${siteConfig.name} - Senior Freelance React Native & Mobile App Engineer

> Senior Freelance React Native Engineer & Mobile Architect with 3+ years of production experience building high-performance, battery-efficient iOS and Android mobile apps for startups and global enterprises.

## Documentation

- [Portfolio Overview](${siteConfig.url}/#home): Professional summary, availability status, and core credentials.
- [Production Case Studies](${siteConfig.url}/#projects): Deep-dive architectural case studies for Piks Daily, BabyCloud, Slate Healthcare, and Sonastar Healthcare.
- [Engineering Journey & Impact](${siteConfig.url}/#experience): 3+ years track record, -30% battery optimization benchmarks, and education.
- [System Capabilities & Tech Stack](${siteConfig.url}/#skills): React Native, TypeScript, Swift/Kotlin TurboModules, JSI, Redux Toolkit, SQLite offline sync.
- [Freelance Services & Contract Models](${siteConfig.url}/#services): Milestone-based delivery, dedicated contractor roles, performance audits.
- [Direct Contact & Hire Inquiries](${siteConfig.url}/#contact): Email, phone, WhatsApp, and transmission channels to hire Jayesh Purohit.

## Optional

- [Full Developer Brief](${siteConfig.url}/llms-full.txt): Comprehensive technical specifications and verified app links for LLMs and automated recruiters.
- [Sitemap](${siteConfig.url}/sitemap.xml): XML sitemap of all site pages.
- [Robots Directives](${siteConfig.url}/robots.txt): Crawler rules and AI agent permissions.
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
