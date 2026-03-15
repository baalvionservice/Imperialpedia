'use client';

import { articlesService, glossaryService, calculatorsService } from '@/services/data';
import { getTags } from '@/modules/content-engine/services/tag-service';
import { getCategories } from '@/modules/content-engine/services/category-service';
import { env } from '@/config/env';

/**
 * @fileOverview Service for generating a comprehensive XML sitemap for pSEO.
 */

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const sitemapService = {
  /**
   * Aggregates all programmatic pages and generates the XML string.
   */
  async generateSitemap(): Promise<string> {
    const baseUrl = env.siteUrl.endsWith('/') ? env.siteUrl.slice(0, -1) : env.siteUrl;
    const entries: SitemapEntry[] = [];

    // 1. Static Core Pages
    const corePages = ['', '/articles', '/glossary', '/topics', '/calculators', '/outline'];
    corePages.forEach(path => {
      entries.push({
        loc: `${baseUrl}${path}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: 1.0,
      });
    });

    // 2. Dynamic Articles
    const articlesRes = await articlesService.getArticles(1, 1000);
    articlesRes.data.forEach(article => {
      entries.push({
        loc: `${baseUrl}/articles/${article.slug}`,
        lastmod: article.publishedAt?.split('T')[0],
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    // 3. Glossary Terms
    const glossaryRes = await glossaryService.getTerms(1, 2000);
    glossaryRes.data.forEach(term => {
      entries.push({
        loc: `${baseUrl}/glossary/${term.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7,
      });
    });

    // 4. Glossary Letters (A-Z)
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
      entries.push({
        loc: `${baseUrl}/glossary/${letter}`,
        changefreq: 'weekly',
        priority: 0.5,
      });
    });

    // 5. Calculators
    const calcRes = await calculatorsService.getCalculatorList();
    calcRes.data.forEach(calc => {
      entries.push({
        loc: `${baseUrl}/calculators/${calc.slug}`,
        changefreq: 'monthly',
        priority: 0.9,
      });
    });

    // 6. Categories
    const catRes = await getCategories();
    catRes.data.forEach(cat => {
      entries.push({
        loc: `${baseUrl}/categories/${cat.slug}`,
        changefreq: 'weekly',
        priority: 0.6,
      });
    });

    // 7. Tags/Topics
    const tagRes = await getTags();
    tagRes.data.forEach(tag => {
      entries.push({
        loc: `${baseUrl}/tags/${tag.slug}`,
        changefreq: 'weekly',
        priority: 0.6,
      });
    });

    return this.buildXml(entries);
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
