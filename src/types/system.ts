/**
 * @fileOverview Type definitions for global system configuration and administrative rules.
 */

export interface PlatformSettings {
  name: string;
  logoUrl: string;
  description: string;
  features: {
    seo: boolean;
    analytics: boolean;
    payments: boolean;
  };
}

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

export interface GlobalNotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordPolicy: {
    minLength: number;
    requireSpecialChar: boolean;
    requireNumber: boolean;
  };
  sessionTimeoutMinutes: number;
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

export interface NotificationLog {
  id: string;
  timestamp: string;
  recipient: string;
  type: string;
  status: 'sent' | 'pending' | 'failed';
  title: string;
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

export interface SystemHealth {
  uptimePercentage: number;
  errorCountLast24h: number;
  apiStatus: 'Healthy' | 'Warning' | 'Critical';
  latency: number;
  history: {
    timestamp: string;
    errors: number;
    load: number;
  }[];
  nodes: {
    name: string;
    status: 'Healthy' | 'Warning' | 'Critical';
    load: number;
  }[];
}

export interface Backup {
  id: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'in-progress';
  size: string;
  type: 'automated' | 'manual';
  checksum: string;
}

export interface AccessLog {
  id: string;
  user: string;
  ip: string;
  device: string;
  timestamp: string;
  status: 'success' | 'failed';
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  module: string;
  type: 'info' | 'warning' | 'critical';
  message: string;
  stackTrace?: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  impact: 'low' | 'medium' | 'high';
  isBeta: boolean;
  module: string;
}

/**
 * Interface for the Admin Activity Log
 */
export interface AdminActivityLog {
  id: string;
  admin: string;
  action: string;
  target: string;
  date: string;
  status: 'Success' | 'Failed';
}

/**
 * Interface for the Role Control Matrix
 */
export interface RoleControl {
  id: string;
  roleName: string;
  usersAssigned: number;
  permissions: string[];
  description?: string;
}

/**
 * Interface for Granular Permission Control
 */
export interface Permission {
  name: string;
  enabled: boolean;
}

export interface RolePermissionSet {
  roleId: string;
  roleName: string;
  description: string;
  permissions: Permission[];
}
