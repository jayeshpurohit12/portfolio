import type { StaticImageData } from "next/image";
import {
  profileAvatar,
  piksDailyImg,
  babyCloudImg,
  slateHealthcareImg,
  sonastarHealthcareImg,
} from "@/assets/images";

/**
 * Centralized Image Assets Configuration
 * Re-exports statically imported WebP assets with metadata and type definitions.
 */
export const IMAGES = {
  // Profile & Branding
  profile: {
    avatar: profileAvatar as StaticImageData,
    ogImage: "/images/jayesh.webp",
    alt: "Jayesh Purohit — Senior React Native Freelance Engineer & Mobile Architect",
  },

  // Production Projects & Case Studies
  projects: {
    piksDaily: {
      src: piksDailyImg as StaticImageData,
      alt: "Piks Daily Mobile App on App Store & Google Play",
    },
    babyCloud: {
      src: babyCloudImg as StaticImageData,
      alt: "BabyCloud Mobile App UI on App Store & Google Play",
    },
    slateHealthcare: {
      src: slateHealthcareImg as StaticImageData,
      alt: "Slate Healthcare Mobile App UI on App Store & Google Play",
    },
    sonastarHealthcare: {
      src: sonastarHealthcareImg as StaticImageData,
      alt: "Sonastar Healthcare Mobile App UI on App Store & Google Play",
    },
  },
} as const;
