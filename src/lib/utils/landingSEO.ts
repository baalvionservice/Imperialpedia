import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata-builder';

/**
 * @fileOverview Specialized SEO utility for the Imperialpedia landing page.
 * Orchestrates the primary search engine and social signals for the platform root.
 * Refined for Prompt 51 with specific metadata and social graph nodes.
 */

export function generateLandingMetadata(): Metadata {
  return buildMetadata({
    title: "Imperialpedia — The World's AI Knowledge Infrastructure",
    description: "Research anything instantly with structured global data. AI-generated knowledge pages, datasets, and research assistant.",
    keywords: [
      "AI Knowledge Infrastructure", 
      "Financial Research", 
      "Structured Global Data", 
      "AI Knowledge Pages", 
      "Datasets", 
      "Research Assistant",
      "pSEO",
      "Intelligence Engine"
    ],
    ogImage: "/og-image.png",
    ogType: "website",
    canonical: "/",
  });
}

// TODO: AI-powered SEO meta suggestions (Phase 2)
// TODO: Auto-generate OG images for AI-generated content (Phase 2)
// TODO: Include multi-language metadata for i18n support (Phase 2)
