import { MetadataRoute } from "next";
import { siteConfig } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow AI Search Engines & LLM Crawlers (Perplexity, ChatGPT, Claude, Gemini, Apple Intelligence)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "GoogleOther",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
