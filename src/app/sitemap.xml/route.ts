import { sitemapService } from '@/modules/seo/services/sitemap-service';

/**
 * Dynamic Route handler for sitemap.xml
 * Provides search engines with a full list of programmatic pages.
 */
export async function GET() {
  try {
    const sitemap = await sitemapService.generateSitemap();

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
