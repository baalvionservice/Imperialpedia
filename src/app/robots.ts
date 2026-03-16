import { MetadataRoute } from 'next';
import { env } from '@/config/env';

/**
 * robots.txt configuration for search engine crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.siteUrl || 'https://imperialpedia.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/private'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
