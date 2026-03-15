'use client';

import { articlesService, glossaryService, calculatorsService } from '@/services/data';
import { getTags } from '@/modules/content-engine/services/tag-service';
import { getCategories } from '@/modules/content-engine/services/category-service';
import { env } from '@/config/env';
import { logger } from '@/lib/errors/logger';

/**
 * @fileOverview Service for generating and monitoring a comprehensive XML sitemap for pSEO.
 */

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const sitemapService = {
  /**
   * High-level function to regenerate the entire sitemap from current data sources.
   * This is the authoritative way to get the latest XML string.
   */
  async regenerateSitemap(): Promise<string> {
    const start = Date.now();
    const baseUrl = env.siteUrl.endsWith('/') ? env.siteUrl.slice(0, -1) : env.siteUrl;
    const entries: SitemapEntry[] = [];

    try {
      // 1. Static Core Pages
      const corePages = ['', '/articles', '/glossary', '/topics', '/calculators', '/outline', '/search'];
      corePages.forEach(path => {
        entries.push({
          loc: `${baseUrl}${path}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'daily',
          priority: 1.0,
        });
      });

      // 2. Fetch all dynamic content in parallel for speed
      const [articlesRes, glossaryRes, calcRes, catRes, tagRes] = await Promise.all([
        articlesService.getArticles(1, 2000),
        glossaryService.getTerms(1, 5000),
        calculatorsService.getCalculatorList(),
        getCategories(),
        getTags(),
      ]);

      // 3. Process Articles
      articlesRes.data.forEach(article => {
        entries.push({
          loc: `${baseUrl}/articles/${article.slug}`,
          lastmod: article.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.8,
        });
      });

      // 4. Process Glossary Terms & Letters
      glossaryRes.data.forEach(term => {
        entries.push({
          loc: `${baseUrl}/glossary/${term.slug}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.7,
        });
      });

      'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        entries.push({
          loc: `${baseUrl}/glossary/${letter}`,
          changefreq: 'weekly',
          priority: 0.5,
        });
      });

      // 5. Process Calculators
      calcRes.data.forEach(calc => {
        entries.push({
          loc: `${baseUrl}/calculators/${calc.slug}`,
          changefreq: 'monthly',
          priority: 0.9,
        });
      });

      // 6. Process Categories & Tags
      catRes.data.forEach(cat => {
        entries.push({
          loc: `${baseUrl}/categories/${cat.slug}`,
          changefreq: 'weekly',
          priority: 0.6,
        });
      });

      tagRes.data.forEach(tag => {
        entries.push({
          loc: `${baseUrl}/tags/${tag.slug}`,
          changefreq: 'weekly',
          priority: 0.6,
        });
      });

      const xml = this.buildXml(entries);
      const duration = Date.now() - start;
      
      logger.info(`Sitemap regenerated in ${duration}ms. Total pages indexed: ${entries.length}`);
      
      return xml;
    } catch (error) {
      logger.error('Failed to regenerate sitemap', error);
      throw error;
    }
  },

  /**
   * Legacy alias for regenerateSitemap to ensure compatibility with existing routes.
   */
  async generateSitemap(): Promise<string> {
    return this.regenerateSitemap();
  },

  /**
   * Subscribes a listener to page updates. 
   * In this mock environment, we simulate reactivity by checking against local memory or 
   * simply exposing a hook for the app to trigger regeneration.
   */
  watchForPageUpdates(callback: () => void) {
    // In a real Firebase app, this would be an onSnapshot listener on a metadata collection.
    // For now, we expose it as a conceptual hook.
    logger.info('Sitemap watcher initialized for programmatic SEO monitoring.');
  },

  /**
   * Wraps entries in the standard sitemap XML structure.
   */
  buildXml(entries: SitemapEntry[]): string {
    const xmlEntries = entries
      .map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority.toFixed(1)}</priority>` : ''}
  </url>`)
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`.trim();
  }
};
