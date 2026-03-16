import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata-builder';

/**
 * @fileOverview Specialized SEO utility for the Imperialpedia landing page.
 * Orchestrates the primary search engine and social signals for the platform root.
 * Refined for Prompt 62 with specific institutional metadata.
 */

export function generateLandingMetadata(): Metadata {
  return buildMetadata({
    title: "Imperialpedia — The World’s AI Knowledge Engine",
    description: "Research anything instantly with structured global data. AI-powered knowledge engine for businesses, investors, and researchers.",
    keywords: [
      "AI knowledge engine", 
      "structured data", 
      "research platform", 
      "Imperialpedia", 
      "global datasets",
      "pSEO",
      "Intelligence Engine"
    ],
    ogImage: "/og-image.png",
    ogType: "website",
    canonical: "/",
  });
}

// TODO: AI-generated dynamic SEO content suggestions
// TODO: Personalized metadata based on visitor location or interest
// TODO: Analytics tracking for SEO and social sharing interactions
