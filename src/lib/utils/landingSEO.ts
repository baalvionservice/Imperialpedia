import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata-builder';

/**
 * @fileOverview Specialized SEO utility for the Imperialpedia landing page.
 * Orchestrates the primary search engine and social signals for the platform root.
 * Aligned with Prompt 70 requirements for institutional metadata.
 */

export function generateLandingMetadata(): Metadata {
  return buildMetadata({
    title: "The World’s AI Knowledge Engine | Imperialpedia",
    description: "Research anything instantly with structured global data using Imperialpedia, the AI knowledge engine.",
    keywords: [
      "AI", 
      "Knowledge Engine", 
      "Research", 
      "Data", 
      "Imperialpedia", 
      "Companies", 
      "Countries", 
      "Technologies"
    ],
    ogImage: "/og-image.png",
    ogType: "website",
    canonical: "/",
  });
}

// TODO: AI-driven meta tag recommendations based on trending keywords
// TODO: Dynamic OG images per page or content type
// // TODO: Automated SEO report generation for admin
