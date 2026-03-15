/**
 * @fileOverview Safe environment variable management.
 */

export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Imperialpedia',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  environment: process.env.NODE_ENV || 'development',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
};

export type Env = typeof env;
