export interface BaseModule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'development' | 'planned';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  authorId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'reader';
}

export interface PlatformConfig {
  name: string;
  description: string;
  defaultLanguage: string;
  defaultPaginationSize: number;
  contactEmail: string;
}

export interface SEOConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  openGraph: {
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
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
}

export interface RouteConfig {
  public: {
    home: string;
    outline: string;
    glossary: string;
    calculators: string;
    creators: string;
  };
  platform: {
    dashboard: string;
  };
  creator: {
    dashboard: string;
    publishing: string;
    monetization: string;
  };
  admin: {
    dashboard: string;
    analytics: string;
  };
}
