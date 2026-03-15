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

export type SystemNotificationType = 'info' | 'success' | 'warning' | 'error';
export type SystemNotificationTarget = 'all' | 'creators' | 'admins';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  active: boolean;
  type: SystemNotificationType;
  target: SystemNotificationTarget;
  createdAt: string;
}

export type AdminAlertType = 'content' | 'user' | 'system';

export interface AdminAlert {
  id: string;
  type: AdminAlertType;
  message: string;
  read: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}
