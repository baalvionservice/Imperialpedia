import { ApiResponse } from '@/types';
import { SystemSettings, SystemNotification, AdminAlert, SystemHealth, Backup, AccessLog, ErrorLog, FeatureFlag } from '@/types/system';

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

const mockAdminAlerts: AdminAlert[] = [
  { id: 'aa-1', type: 'content', message: 'New high-priority article submission from @marketmaven.', read: false, createdAt: new Date().toISOString(), priority: 'high' },
  { id: 'aa-2', type: 'user', message: 'Expert verification request pending for User #842.', read: false, createdAt: new Date().toISOString(), priority: 'medium' },
  { id: 'aa-3', type: 'system', message: 'pSEO Health Audit complete: 14 nodes require metadata optimization.', read: false, createdAt: new Date().toISOString(), priority: 'low' },
];

const mockBackups: Backup[] = [
  { id: 'bak-1', timestamp: '2024-03-12T04:00:00Z', status: 'completed', size: '1.4GB', type: 'automated', checksum: 'sha256:8f2d...' },
  { id: 'bak-2', timestamp: '2024-03-11T04:00:00Z', status: 'completed', size: '1.38GB', type: 'automated', checksum: 'sha256:4a1c...' },
  { id: 'bak-3', timestamp: '2024-03-10T15:30:00Z', status: 'completed', size: '1.35GB', type: 'manual', checksum: 'sha256:9e0b...' },
  { id: 'bak-4', timestamp: '2024-03-09T04:00:00Z', status: 'failed', size: '0KB', type: 'automated', checksum: 'N/A' },
];

const mockFeatureFlags: FeatureFlag[] = [
  { id: 'ff-1', name: 'AI Content Outliner', enabled: true, description: 'Generative AI tool for building article structures from topics.', impact: 'low', isBeta: false, module: 'Content Engine' },
  { id: 'ff-2', name: 'Expert Payout Automations', enabled: false, description: 'Automated 15-day settlement cycles for verified creators.', impact: 'high', isBeta: true, module: 'Monetization' },
  { id: 'ff-3', name: 'pSEO v2 Scaling', enabled: true, description: 'Next-gen programmatic engine supporting 5M+ indexable nodes.', impact: 'medium', isBeta: false, module: 'Infrastructure' },
  { id: 'ff-4', name: 'Institutional Portfolio View', enabled: false, description: 'High-fidelity aggregate views for private wealth users.', impact: 'medium', isBeta: true, module: 'Calculators' },
  { id: 'ff-5', name: 'Real-time Market Data', enabled: true, description: 'Live stock and bond price ingestion for analysis nodes.', impact: 'high', isBeta: false, module: 'Intelligence' },
  { id: 'ff-6', name: 'Multilingual Glossary', enabled: false, description: 'Automated translation of the financial glossary into 12 languages.', impact: 'low', isBeta: true, module: 'SEO' },
];

const mockAccessLogs: AccessLog[] = [
  { id: 'acc-1', user: 'eleanor@imperialpedia.com', ip: '192.168.1.42', device: 'Desktop (macOS / Chrome)', timestamp: '2024-03-12T10:30:00Z', status: 'success' },
  { id: 'acc-2', user: 'maven@imperialpedia.com', ip: '10.0.0.15', device: 'Mobile (iOS / Safari)', timestamp: '2024-03-12T09:15:00Z', status: 'success' },
  { id: 'acc-3', user: 'unknown@hacker.net', ip: '45.12.88.2', device: 'Linux / Firefox', timestamp: '2024-03-12T08:45:00Z', status: 'failed' },
];

const mockErrorLogs: ErrorLog[] = [
  { id: 'err-1', timestamp: '2024-03-12T11:45:00Z', module: 'API Gateway', type: 'critical', message: 'Connection timeout reached while attempting to synchronize search cluster indices.' },
  { id: 'err-2', timestamp: '2024-03-12T10:20:00Z', module: 'Content Engine', type: 'warning', message: 'Failed to generate automated summary for intelligence node art-452. Falling back to default excerpt.' },
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

export const getAdminAlerts = async (): Promise<ApiResponse<AdminAlert[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockAdminAlerts,
    status: 200,
  };
};

export const getSystemHealth = async (): Promise<ApiResponse<SystemHealth>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      apiUptime: 99.98,
      dbStatus: 'healthy',
      serverLoad: 42,
      errorRate: 0.04,
      latency: 42,
      history: Array.from({ length: 24 }, (_, i) => ({
        timestamp: `${i}:00`,
        load: Math.floor(Math.random() * 30) + 20,
        errors: Math.random() * 0.1
      }))
    },
    status: 200
  };
};

export const getBackups = async (): Promise<ApiResponse<Backup[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockBackups,
    status: 200,
  };
};

export const createBackup = async (): Promise<ApiResponse<Backup>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const newBackup: Backup = {
    id: `bak-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    status: 'completed',
    size: '1.42GB',
    type: 'manual',
    checksum: `sha256:${Math.random().toString(36).substr(2, 10)}`
  };
  return {
    data: newBackup,
    status: 200,
    message: 'System snapshot created and mirrored to off-site vault.'
  };
};

export const restoreBackup = async (id: string): Promise<ApiResponse<void>> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    data: undefined,
    status: 200,
    message: `Platform state successfully reverted to snapshot ${id}.`
  };
};

export const getFeatureFlags = async (): Promise<ApiResponse<FeatureFlag[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockFeatureFlags,
    status: 200,
  };
};

export const updateFeatureFlag = async (id: string, enabled: boolean): Promise<ApiResponse<void>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: undefined,
    status: 200,
    message: `Feature flag status updated successfully.`
  };
};

export const getAccessLogs = async (): Promise<ApiResponse<AccessLog[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockAccessLogs,
    status: 200,
  };
};

export const getErrorLogs = async (): Promise<ApiResponse<ErrorLog[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockErrorLogs,
    status: 200,
  };
};
