/**
 * @fileOverview Safe environment variable management with fallback defaults.
 */

export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Imperialpedia',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://imperialpedia.com',
  environment: (process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  isDev: (process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV) !== 'production',
};

export type Env = typeof env;
