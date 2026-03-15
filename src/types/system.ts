/**
 * @fileOverview Type definitions for global system configuration and administrative rules.
 */

export interface SystemSettings {
  platform: {
    siteName: string;
    contactEmail: string;
    maintenanceMode: boolean;
    defaultCurrency: string;
  };
  seo: {
    defaultTitleTemplate: string;
    metaDescriptionTemplate: string;
    indexProgrammablePages: boolean;
    autoGenerateSitemaps: boolean;
  };
  notifications: {
    enableEmailAlerts: boolean;
    adminDailyDigest: boolean;
    systemAlertsWebhook: string;
  };
  governance: {
    requireVettingForMonetization: boolean;
    defaultRevenueShare: number; // percentage
    allowSelfOnboarding: boolean;
    autoModerateComments: boolean;
  };
}
