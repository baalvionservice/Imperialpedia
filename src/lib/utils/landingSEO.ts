import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata-builder';

/**
 * @fileOverview Specialized SEO utility for the Imperialpedia landing page.
 * Orchestrates the primary search engine and social signals for the platform root.
 */

export function generateLandingMetadata(): Metadata {
  return buildMetadata({
    title: "Imperialpedia – The World’s AI Knowledge Infrastructure",
    description: "Research anything instantly with structured global data. Explore 1M+ indexable nodes across countries, companies, industries, and technologies.",
    keywords: [
      "AI Knowledge Engine", 
      "Financial Intelligence", 
      "Structured Global Data", 
      "Institutional Research", 
      "Programmatic SEO",
      "Knowledge Graph"
    ],
    ogImage: "/og-image.jpg", // Placeholder for Phase 2
    ogType: "website",
  });
}

// TODO: Use AI to auto-generate landing page descriptions in Phase 2
// TODO: Integrate dynamic Open Graph image generation via @vercel/og
// TODO: Add schema.org structured data for rich results (Organization, SoftwareApplication)
