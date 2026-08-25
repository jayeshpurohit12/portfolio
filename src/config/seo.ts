import { IMAGES } from "@/config/images";

export const siteConfig = {
  name: "Jayesh Purohit",
  title: "Jayesh Purohit | Freelance React Native & Mobile App Engineer",
  shortTitle: "Jayesh Purohit — React Native Specialist",
  description:
    "Expert Freelance React Native & Mobile App Engineer with 3+ years of experience building high-performance, battery-efficient iOS and Android apps. Specializing in TypeScript, Swift/Kotlin native modules, and offline-first architectures for startups and global enterprises.",
  url: process.env.NEXT_PUBLIC_SITE_URL!,
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL!}${typeof IMAGES.profile.avatar === "string" ? IMAGES.profile.avatar : IMAGES.profile.avatar.src}`,
  author: {
    name: "Jayesh Purohit",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE!,
    role: "Senior React Native Freelance Engineer & Mobile Architect",
    github: process.env.NEXT_PUBLIC_GITHUB_URL!,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL!,
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL!,
  },
  keywords: [
    // Primary Freelance & Role Keywords
    "React Native Freelancer",
    "Freelance React Native Developer",
    "Hire React Native Engineer",
    "Hire Mobile App Developer",
    "React Native Contractor Worldwide",
    "Mobile App Developer Freelance",
    "Remote React Native Specialist",
    "Senior Mobile App Consultant",
    "Cross-Platform App Development",
    "iOS and Android App Developer",

    // Technical Skills Keywords
    "React Native Performance Optimization",
    "Battery Efficient React Native Apps",
    "React Native Swift Kotlin Native Modules",
    "Offline-First Mobile Architecture",
    "React Native TypeScript Specialist",
    "React Native Redux Toolkit Context API",
    "Expo and Bare React Native Developer",
    "TurboModules JSI Architecture",

    // Geographic & Target Audience
    "Hire Mobile Developer Worldwide",
    "US React Native Contractor",
    "Europe Remote React Native Developer",
    "Top React Native Freelancers",
    "App Store and Google Play Deployment Expert",
  ],
  services: [
    "Full-Cycle Cross-Platform Mobile Development (iOS & Android)",
    "React Native App Performance & Battery Life Optimization",
    "Custom Native Modules (Swift, Kotlin, C++) & TurboModules",
    "Offline-First Data Sync & Real-Time Architectures",
    "Biometric Security & HIPAA/GDPR Compliance Verification",
    "App Store & Google Play Store Publishing, CI/CD & Maintenance",
  ],
  stats: {
    yearsExperience: "3+",
    projectsDelivered: "10+",
    batteryOptimization: "30%",
    corePlatforms: "2",
  },
};

/**
 * Generates JSON-LD Structured Data for Person, ProfessionalService, FAQPage & WebSite
 * for Google Rich Snippets, Knowledge Panels, and worldwide search indexing.
 */
export function generateJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    url: siteConfig.url,
    email: siteConfig.author.email,
    telephone: siteConfig.author.phone,
    image: `${siteConfig.url}${typeof IMAGES.profile.avatar === "string" ? IMAGES.profile.avatar : IMAGES.profile.avatar.src}`,
    sameAs: [
      siteConfig.author.github,
      siteConfig.author.linkedin,
      siteConfig.author.twitter,
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "React Native Freelance Engineer & Mobile Architect",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Worldwide / Remote",
      },
      skills:
        "React Native, TypeScript, iOS Swift, Android Kotlin, Performance Optimization, TurboModules, JSI, Offline-First Architecture, App Store Publishing",
    },
    knowsAbout: [
      "React Native",
      "Mobile Application Development",
      "TypeScript",
      "JavaScript",
      "iOS Development",
      "Android Development",
      "Swift",
      "Kotlin",
      "Next.js",
      "React.js",
      "Redux Toolkit",
      "Performance Tuning",
      "Battery Optimization",
      "Offline-First SQLite",
      "App Store Deployment",
      "Google Play Deployment",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Acropolis Institute of Technology and Research",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: "Jayesh Purohit — React Native & Mobile App Development Consulting",
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.author.phone,
    email: siteConfig.author.email,
    priceRange: "$$$",
    currenciesAccepted: "USD, EUR, GBP, CAD, AUD, INR",
    paymentAccepted: "Wire Transfer, Stripe, Contract, Upwork",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Worldwide" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Mobile Engineering Offerings",
      itemListElement: siteConfig.services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
        position: index + 1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I hire Jayesh Purohit for a React Native freelance or contract project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can hire Jayesh Purohit by emailing jayesh.purohit.yt@gmail.com or messaging via WhatsApp at +91 7354360460. He is available worldwide for full-time remote contracts, milestone-based builds, and performance audits.",
        },
      },
      {
        "@type": "Question",
        name: "Does Jayesh Purohit build apps for both iOS and Android simultaneously?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Jayesh specializes in cross-platform React Native development with TypeScript and native Swift/Kotlin bindings, delivering fluid 60 FPS mobile apps deployed to both the Apple App Store and Google Play Store.",
        },
      },
      {
        "@type": "Question",
        name: "What live production apps has Jayesh Purohit engineered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jayesh has engineered and shipped high-scale production apps including BabyCloud (worldwide parenting platform), Slate Healthcare (US healthcare recruitment platform), Sonastar Healthcare (hospital equipment management), and Piks Daily (live GPS pet tracking).",
        },
      },
      {
        "@type": "Question",
        name: "How does Jayesh Purohit optimize mobile battery consumption and performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jayesh implements JSI TurboModules, intelligent background location polling throttling, Ramer-Douglas-Peucker path smoothing, and optimized state management to reduce device battery consumption by over 30% and eliminate frame drops.",
        },
      },
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: "Jayesh Purohit — React Native Freelancer Portfolio",
    url: siteConfig.url,
    alternateName: [
      "Hire React Native Freelancer",
      "Jayesh Purohit Mobile App Engineer",
    ],
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  return {
    personSchema,
    serviceSchema,
    faqSchema,
    webSiteSchema,
  };
}
