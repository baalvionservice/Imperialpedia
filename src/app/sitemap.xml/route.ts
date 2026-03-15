import { sitemapService } from '@/modules/seo/services/sitemap-service';

/**
 * Dynamic Route handler for sitemap.xml
 * Provides search engines with a full list of programmatic pages.
 * Re-generates on every request in development to ensure latest pages are seen.
 */
export async function GET() {
  try {
    // Call regenerateSitemap to ensure we have the most current list of mock data pages
    const sitemap = await sitemapService.regenerateSitemap();

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        // In production, we allow short-term caching, but stale-while-revalidate for freshness
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
