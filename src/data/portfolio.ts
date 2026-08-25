import type { StaticImageData } from "next/image";
import { IMAGES } from "@/config/images";

export interface Project {
  id: string;
  title: string;
  category: string;
  region: string;
  summary: string;
  image: StaticImageData | string;
  imageAlt: string;
  platforms: ("Android" | "iOS" | "Web")[];
  technologies: string[];
  highlights: string[];
  metrics?: { label: string; value: string };
  links?: {
    demo?: string;
    github?: string;
    playstore?: string;
    appstore?: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  skills: string[];
  isCurrent?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; tag?: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const portfolioData = {
  profile: {
    name: "Jayesh Purohit",
    headline: "Engineering High-Performance Mobile Experiences.",
    tagline:
      "Helping brands and startups build scalable, battery-efficient, and cross-platform apps that users love. Specializing in React Native, TypeScript, and robust full-stack architecture.",
    status: "Available for new freelance & contract opportunities",
    avatar: IMAGES.profile.avatar,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE!,
    location: process.env.NEXT_PUBLIC_CONTACT_LOCATION!,
    socials: {
      github: process.env.NEXT_PUBLIC_GITHUB_URL!,
      linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL!,
      twitter: process.env.NEXT_PUBLIC_TWITTER_URL!,
      email: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`,
      tel: `tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`,
    },
  },

  stats: [
    {
      label: "Years Exp.",
      value: "3+",
      description: "Production mobile & web engineering",
    },
    {
      label: "Projects Delivered",
      value: "10+",
      description: "Shipped to App Store & Google Play",
    },
    {
      label: "Battery Opt.",
      value: "30%",
      description: "Background GPS & polling efficiency",
    },
    {
      label: "Core Platforms",
      value: "2",
      description: "Seamless iOS & Android native integration",
    },
  ],

  projects: [
    {
      id: "piks-daily",
      title: "Piks Daily",
      category: "Pet Tech / Live GPS Tracking",
      region: "Poland & Worldwide",
      summary:
        "High-accuracy live GPS pet walking tracker with intelligent path-smoothing and background polling battery conservation.",
      image: IMAGES.projects.piksDaily.src,
      imageAlt: IMAGES.projects.piksDaily.alt,
      platforms: ["Android", "iOS"],
      technologies: [
        "React Native",
        "TypeScript",
        "Swift",
        "Kotlin",
        "React Navigation",
      ],
      highlights: [
        "Architected separate, isolated user flows for Pet Owners and Walkers using React Navigation, drastically reducing onboarding friction.",
        "Engineered a real-time GPS tracking system with optimized background location polling, cutting device battery consumption by over 30%.",
        "Integrated Ramer-Douglas-Peucker path-smoothing algorithms to eliminate map jitter and reduce location data payloads by 40%.",
      ],
      metrics: { label: "Recent Project", value: "30% Battery Saved" },
      links: {
        appstore: "https://apps.apple.com/in/app/piks-daily/id6761775488",
        playstore:
          "https://play.google.com/store/apps/details?id=com.piks.walker",
      },
    },
    {
      id: "babycloud",
      title: "BabyCloud",
      category: "Parenting & Pediatric Care",
      region: "Worldwide",
      summary:
        "High-growth pediatric and parenting development platform with automated milestone tracking, real-time analytics, and optimized offline caching.",
      image: IMAGES.projects.babyCloud.src,
      imageAlt: IMAGES.projects.babyCloud.alt,
      platforms: ["Android", "iOS"],
      technologies: [
        "React Native",
        "TypeScript",
        "Redux",
        "Node.js",
        "Analytics",
      ],
      highlights: [
        "Architected full React Native architecture scaling to hundreds of thousands of active parents worldwide.",
        "Cut UI re-renders in core features (QnA & Assessment modules) by 70%, guaranteeing a fluid 60fps experience.",
        "Integrated refresh token batching and offline storage, decreasing redundant API calls and backend load.",
      ],
      metrics: { label: "User Growth", value: "+50% Engagement" },
      links: {
        appstore: "https://apps.apple.com/in/app/babycloud/id1639791311",
        playstore:
          "https://play.google.com/store/apps/details?id=com.adwaitaeducare.parenting",
      },
    },
    {
      id: "slate-healthcare",
      title: "Slate Healthcare",
      category: "HealthTech / Job Matching",
      region: "United States (USA)",
      summary:
        "HIPAA-compliant healthcare recruitment platform with biometric face authentication, real-time Twilio chat, and verified medical credentialing.",
      image: IMAGES.projects.slateHealthcare.src,
      imageAlt: IMAGES.projects.slateHealthcare.alt,
      platforms: ["Android", "iOS"],
      technologies: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Twilio Chat",
        "Biometrics",
      ],
      highlights: [
        "Shipped end-to-end recruitment matching workflows for medical professionals and US hospital systems.",
        "Implemented secure biometric face authentication and encrypted SQLite data storage for strict HIPAA compliance.",
        "Configured real-time chat and multi-channel notifications using Twilio and Firebase Cloud Messaging.",
      ],
      metrics: { label: "Compliance", value: "HIPAA Certified" },
      links: {
        appstore: "https://apps.apple.com/us/app/slate-healthcare/id6752774384",
        playstore:
          "https://play.google.com/store/apps/details?id=com.slate.healthcare",
      },
    },
    {
      id: "sonastar-project",
      title: "Sonastar Healthcare",
      category: "Medicine & Care Management",
      region: "Worldwide",
      summary:
        "Multi-tenant medical equipment management, dosage scheduling, and offline-first notification system engineered for zero data loss.",
      image: IMAGES.projects.sonastarHealthcare.src,
      imageAlt: IMAGES.projects.sonastarHealthcare.alt,
      platforms: ["Android", "iOS"],
      technologies: [
        "React Native",
        "JavaScript",
        "Push Notifications",
        "Offline Sync",
        "TurboModules",
      ],
      highlights: [
        "Architected multi-tenant hospital equipment tracking and asset management dashboard.",
        "Built custom offline-first SQLite sync engine to preserve clinical records during low-connectivity scenarios.",
        "Configured high-priority background alarms and push notification workers for mission-critical maintenance schedules.",
      ],
      metrics: { label: "Data Integrity", value: "100% Offline-First" },
      links: {
        appstore: "https://apps.apple.com/in/app/sona-star/id6502391527",
        playstore:
          "https://play.google.com/store/apps/details?id=com.medical_equipment_management",
      },
    },
  ] as Project[],

  experience: [
    {
      id: "freelance-mobile",
      company: "Freelance Mobile Developer (Self-employed)",
      role: "React Native Specialist & Mobile Architect",
      period: "Mar 2025 - Present",
      isCurrent: true,
      highlights: [
        "Piks Daily (Poland): Engineered real-time background GPS tracking with Ramer-Douglas-Peucker path smoothing, reducing battery consumption by >30% and network payload by 40%.",
        "Slate Healthcare (USA): Shipped end-to-end healthcare job-matching app featuring biometric face authentication, Twilio Chat, FCM push notifications, and verified compliance.",
        "Sonastar Healthcare: Architected and delivered entire clinical medicine and hospital equipment management suite from scratch.",
      ],
      skills: [
        "React Native",
        "TypeScript",
        "Swift (Native Module)",
        "Kotlin (Native Module)",
        "GPS & Background Tasks",
        "Twilio & FCM",
      ],
    },
    {
      id: "babycloud",
      company: "Adwaita Educare (BabyCloud)",
      role: "Software Development Engineer",
      period: "Mar 2023 - Feb 2025",
      isCurrent: false,
      highlights: [
        "Designed and launched the Babycloud Bizz app for healthcare and education professionals, delivering performance enhancements that increased user engagement by 50% and reduced crash rates by 25%.",
        "Architected a multi-functional child care module featuring advanced analytics and developmental tracking, driving a 35% increase in user adoption and improving recorded development outcomes by 20%.",
        "Optimized React Native frontend rendering by effectively managing component state, reducing UI re-renders in core features (like QnA) by 70% to guarantee a 60fps responsive user experience.",
        "Engineered network-layer improvements by optimizing the refresh token API, successfully consolidating multiple parallel execution requests into a single efficient call to minimize server load.",
      ],
      skills: [
        "React Native",
        "TypeScript",
        "State Management",
        "API Optimization",
        "Performance Tuning",
      ],
    },
    {
      id: "bajaj-finserv",
      company: "Bajaj Finserv Health Limited",
      role: "Software Development Engineer Intern",
      period: "Jul 2022 - Dec 2022",
      isCurrent: false,
      highlights: [
        "Implemented multiple file upload feature in chat and optimised the loading speed by 30%.",
        "Migrated the native library of Camera and BottomSheet to make it ultra-fast and fluidly interactive.",
        "Raised B2C squad unit-test coverage from 30% to 60% using Jest.",
        "Reduced unnecessary API calls and optimized code quality across key customer journeys.",
      ],
      skills: [
        "React Native",
        "Jest Unit Testing",
        "Native Camera",
        "BottomSheet",
        "Chat Architecture",
      ],
    },
  ] as ExperienceItem[],

  education: {
    degree: "Bachelor of Technology in Computer Science and Technology",
    institution: "Acropolis Institute of Technology and Research",
    period: "Aug 2019 - Jun 2023",
    location: "Indore, M.P, India",
    score: "CGPA: 8.66",
  } as EducationItem,

  impactMetrics: [
    {
      label: "User Engagement",
      value: "+50%",
      color: "#2e5bff",
      percentage: 50,
    },
    {
      label: "Crash Rate Reduction",
      value: "-25%",
      color: "#22c55e",
      percentage: 25,
    },
    {
      label: "UI Re-render Reduction",
      value: "-70%",
      color: "#22c55e",
      percentage: 70,
    },
  ],

  skillsCategories: [
    {
      title: "Core Languages",
      icon: "Code2",
      skills: [
        { name: "TypeScript" },
        { name: "JavaScript (ES6+)" },
        { name: "Swift", tag: "Native Module" },
        { name: "Kotlin", tag: "Native Module" },
        { name: "C++" },
        { name: "HTML5 / CSS3" },
      ],
    },
    {
      title: "Mobile & Frontend",
      icon: "Smartphone",
      skills: [
        { name: "React Native" },
        { name: "React.js" },
        { name: "Next.js" },
        { name: "Redux & Redux Toolkit" },
        { name: "Context API" },
        { name: "React Navigation" },
        { name: "Expo & Bare Workflows" },
        { name: "iOS & Android SDKs" },
        { name: "App Store & Play Console" },
      ],
    },
    {
      title: "DevOps & Tooling",
      icon: "Wrench",
      skills: [
        { name: "Git & GitHub" },
        { name: "GitHub Actions (CI/CD)" },
        { name: "Xcode" },
        { name: "Android Studio" },
        { name: "Postman" },
        { name: "Figma" },
        { name: "Jest Testing" },
        { name: "Firebase & Supabase" },
      ],
    },
  ],

  achievements: [
    {
      title: "DevIncept Open-Source Top Contributor",
      description:
        "Ranked among the top 6 contributors out of 40 developers in the DevIncept open-source program.",
      badge: "Top 15% Contributor",
    },
  ],

  services: [
    {
      id: "full-app",
      title: "Cross-Platform App Development",
      subtitle: "End-to-End iOS & Android Delivery",
      description:
        "Building production-ready, beautiful, pixel-perfect React Native applications from scratch or Figma designs with native-like speed.",
      deliverables: [
        "iOS & Android Build Setup",
        "State Architecture & Navigation",
        "Backend / API Integration",
        "Store Submission Support",
      ],
      icon: "Smartphone",
    },
    {
      id: "performance-audit",
      title: "Performance & Battery Optimization",
      subtitle: "60 FPS Smoothness & Power Efficiency",
      description:
        "Diagnosing memory leaks, rendering bottlenecks, unoptimized background tasks, and heavy payloads to cut crash rates and battery drain.",
      deliverables: [
        "Re-render Profiling",
        "Background Location & Task Tuning",
        "Bundle Size Shrinking",
        "Crashlytics Stability Overhaul",
      ],
      icon: "Zap",
    },
    {
      id: "native-bridge",
      title: "Custom Native Modules & Bridges",
      subtitle: "Swift, Kotlin & C++ Integration",
      description:
        "Bridging complex native hardware features, biometric authentication, Bluetooth LE, custom camera pipelines, and legacy SDKs into React Native.",
      deliverables: [
        "Custom TurboModules & Fabric",
        "Biometric Auth Protocols",
        "Hardware & Sensor Bridges",
        "Native Payment Gateways",
      ],
      icon: "Cpu",
    },
  ] as ServiceItem[],
};
