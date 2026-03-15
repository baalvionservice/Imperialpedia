import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata-builder';
import { structuredData } from '@/lib/seo/structured-data';
import { SEOPageData, BreadcrumbItem } from '../types';

/**
 * @fileOverview Core service for Programmatic SEO logic.
 * Orchestrates metadata generation and structured data for high-scale pages.
 */

export const seoService = {
  /**
   * Generates dynamic Next.js Metadata for programmatic pages.
   */
  generateMetadata: (data: SEOPageData, pathPrefix: string): Metadata => {
    return buildMetadata({
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      canonical: `${pathPrefix}/${data.slug}`,
      ogImage: data.image,
      ogType: data.type === 'article' ? 'article' : 'website',
    });
  },

  /**
   * Generates JSON-LD Structured Data for search engines.
   */
  generateStructuredData: (data: SEOPageData, type: 'article' | 'glossary' | 'tool' | 'breadcrumb') => {
    switch (type) {
      case 'article':
        return structuredData.article({
          title: data.title,
          description: data.description,
          image: data.image || '',
          authorName: data.author || 'Imperialpedia Expert',
          datePublished: data.publishedAt || new Date().toISOString(),
          dateModified: data.updatedAt,
        });
      
      case 'breadcrumb':
        // Logic for breadcrumbs can be added here
        return null;

      default:
        return structuredData.organization();
    }
  },

  /**
   * Helper to create breadcrumb items.
   */
  buildBreadcrumbs: (items: BreadcrumbItem[]) => {
    return structuredData.breadcrumb(items);
  }
};
