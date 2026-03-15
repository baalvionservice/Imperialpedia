/**
 * @fileOverview SEO and metadata related types.
 */

export interface OpenGraphData {
  type: string;
  locale: string;
  url: string;
  siteName: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
}

export interface TwitterData {
  handle: string;
  site: string;
  cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  og?: OpenGraphData;
  twitter?: TwitterData;
}

export interface SEOConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  openGraph: OpenGraphData;
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}
