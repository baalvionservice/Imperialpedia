import { generateSitemap } from "@/lib/utils/generateSitemap";
import { NextResponse } from "next/server";

/**
 * Dynamic Route handler for sitemap.xml
 * Provides search engines with a full list of primary discovery nodes.
 */
export async function GET() {
  try {
    const sitemap = generateSitemap();

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
