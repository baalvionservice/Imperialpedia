import { RouteConfig } from '@/types';

/**
 * @fileOverview Centralized route definitions for the entire application.
 */

export const routes: RouteConfig = {
  public: {
    home: '/',
    outline: '/outline',
    glossary: '/glossary',
    calculators: '/calculators',
    creators: '/creators',
  },
  platform: {
    dashboard: '/dashboard',
  },
  creator: {
    dashboard: '/creator/dashboard',
    publishing: '/creator/publishing',
    monetization: '/creator/monetization',
  },
  admin: {
    dashboard: '/admin/dashboard',
    analytics: '/admin/analytics',
  },
};
