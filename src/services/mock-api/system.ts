import { ApiResponse } from '@/types';
import { SystemSettings } from '@/types/system';

/**
 * @fileOverview Mock service for managing global platform configuration.
 */

const mockSettings: SystemSettings = {
  platform: {
    siteName: 'Imperialpedia',
    contactEmail: 'admin@imperialpedia.com',
    maintenanceMode: false,
    defaultCurrency: 'USD'
  },
  seo: {
    defaultTitleTemplate: '%title% | Imperialpedia Intelligence',
    metaDescriptionTemplate: 'Expert-led financial intelligence on %topic%.',
    indexProgrammablePages: true,
    autoGenerateSitemaps: true
  },
  notifications: {
    enableEmailAlerts: true,
    adminDailyDigest: true,
    systemAlertsWebhook: 'https://hooks.slack.com/services/...'
  },
  governance: {
    requireVettingForMonetization: true,
    defaultRevenueShare: 70,
    allowSelfOnboarding: true,
    autoModerateComments: false
  }
};

export const getSystemSettings = async (): Promise<ApiResponse<SystemSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockSettings,
    status: 200,
  };
};

export const updateSystemSettings = async (settings: SystemSettings): Promise<ApiResponse<SystemSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: settings,
    status: 200,
    message: 'System configuration synchronized successfully.'
  };
};
