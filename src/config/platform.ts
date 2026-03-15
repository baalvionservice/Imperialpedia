import { PlatformConfig } from '@/types';
import { env } from './env';

/**
 * @fileOverview Global platform configuration and constants.
 */

export const platformConfig: PlatformConfig = {
  name: env.appName,
  description: 'The world\'s most scalable financial intelligence engine. Explore over 1,000,000 pages of deep financial insights.',
  defaultLanguage: 'en',
  defaultPaginationSize: 20,
  contactEmail: 'hello@imperialpedia.com',
};
