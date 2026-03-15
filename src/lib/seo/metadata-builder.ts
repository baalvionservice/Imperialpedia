import { Metadata } from 'next';
import { seoConfig } from '@/config/seo';
import { env } from '@/config/env';

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Generates a dynamic Next.js Metadata object by merging custom values with global defaults.
 * This supports the scale of 1,000,000+ pages by providing a consistent interface.
 */
export function buildMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
}: MetadataProps = {}): Metadata {
  const finalTitle = title ? `${title} | ${seoConfig.defaultTitle}` : seoConfig.defaultTitle;
  const finalDescription = description || seoConfig.defaultDescription;
  const finalKeywords = keywords || seoConfig.defaultKeywords;
  const url = canonical ? `${env.siteUrl}${canonical}` : env.siteUrl;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: url,
      siteName: seoConfig.openGraph.siteName,
      images: [
        {
          url: ogImage || seoConfig.openGraph.images[0].url,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: seoConfig.openGraph.locale,
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImage || seoConfig.openGraph.images[0].url],
      creator: seoConfig.twitter.handle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
