import { ApiResponse } from '@/types';
import { SystemSettings, SystemNotification } from '@/types/system';

/**
 * @fileOverview Mock service for managing global platform configuration and system notifications.
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

const mockNotifications: SystemNotification[] = [
  { id: 'sn-1', title: 'Q1 Performance Grants', message: 'Applications for the Q1 Intelligence Research grants are now open for verified experts.', active: true, type: 'success', target: 'creators', createdAt: '2024-03-10T10:00:00Z' },
  { id: 'sn-2', title: 'System Maintenance', message: 'The pSEO indexing engine will undergo scheduled optimization on Sunday at 02:00 UTC.', active: true, type: 'warning', target: 'all', createdAt: '2024-03-12T08:30:00Z' },
  { id: 'sn-3', title: 'Policy Update', message: 'Expert revenue share benchmarks have been updated in the System Configuration panel.', active: false, type: 'info', target: 'admins', createdAt: '2024-03-05T14:20:00Z' },
];

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

export const getSystemNotifications = async (): Promise<ApiResponse<SystemNotification[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockNotifications,
    status: 200,
  };
};

export const updateSystemNotification = async (notification: SystemNotification): Promise<ApiResponse<SystemNotification>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: notification,
    status: 200,
    message: 'Broadcast parameters updated.'
  };
};

export const deleteSystemNotification = async (id: string): Promise<ApiResponse<void>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: undefined,
    status: 200,
    message: 'Notification purged from index.'
  };
};
