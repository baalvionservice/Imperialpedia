import { env } from '@/config/env';

/**
 * @fileOverview Static sitemap generator for Phase 1.
 * This will be expanded in Phase 2 to include 1M+ dynamic entity nodes.
 */

export const generateSitemap = () => {
  const baseUrl = env.siteUrl || 'https://imperialpedia.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#features</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#faq</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#pricing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/creators</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/glossary</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/financial-tools</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- TODO: Auto-generate sitemap entries for AI-generated entity pages in Phase 2 -->
  <!-- TODO: Integrate AI-powered SEO recommendations for metadata -->
  <!-- TODO: Dynamic robots rules per country / region -->
</urlset>`.trim();
};
