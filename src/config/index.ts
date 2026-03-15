export const siteConfig = {
  name: 'Imperialpedia',
  description: 'Scalable Financial Knowledge Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://imperialpedia.com',
  ogImage: 'https://imperialpedia.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/imperialpedia',
    github: 'https://github.com/imperialpedia',
  },
};

export type SiteConfig = typeof siteConfig;
