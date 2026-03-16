import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata-builder';

/**
 * @fileOverview Specialized SEO utility for the Imperialpedia landing page.
 * Orchestrates the primary search engine and social signals for the platform root.
 * Refined for Prompt 39 with specific metadata and social graph nodes.
 */

export function generateLandingMetadata(): Metadata {
  return buildMetadata({
    title: "Imperialpedia — AI Knowledge Engine",
    description: "Imperialpedia — The world's AI Knowledge Infrastructure. Research anything instantly with structured global data.",
    keywords: [
      "AI", 
      "Knowledge", 
      "Research", 
      "Data", 
      "Companies", 
      "Countries", 
      "Industries",
      "Financial Intelligence",
      "pSEO"
    ],
    ogImage: "/og-image.png", // Placeholder for Phase 2
    ogType: "website",
    canonical: "/",
  });
}

// TODO: AI-generated dynamic metadata for entity pages in Phase 2
// TODO: Auto-generate OG images for AI-generated content
// TODO: Include multi-language metadata for i18n support
// TODO: Add schema.org structured data for rich results (Organization, SoftwareApplication)
