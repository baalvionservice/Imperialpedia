import { ApiResponse } from '@/types';
import { SystemSettings, SystemNotification, AdminAlert, SystemHealth, Backup, AccessLog, ErrorLog, FeatureFlag, NotificationLog, PlatformSettings, AdminActivityLog, SecuritySettings, GlobalNotificationSettings, AuditTrailEntry } from '@/types/system';

/**
 * @fileOverview Mock service for managing global platform configuration and system notifications.
 */

const mockPlatformSettings: PlatformSettings = {
  name: 'Imperialpedia',
  logoUrl: 'https://imperialpedia.com/logo.png',
  description: 'The world\'s most scalable financial intelligence engine. Explore over 1,000,000 pages of deep financial insights.',
  features: {
    seo: true,
    analytics: true,
    payments: false
  }
};

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

const mockGlobalNotificationSettings: GlobalNotificationSettings = {
  email: true,
  push: true,
  sms: false
};

const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: true,
  passwordPolicy: {
    minLength: 12,
    requireSpecialChar: true,
    requireNumber: true
  },
  sessionTimeoutMinutes: 120
};

const mockNotifications: SystemNotification[] = [
  { id: 'sn-1', title: 'Q1 Performance Grants', message: 'Applications for the Q1 Intelligence Research grants are now open for verified experts.', active: true, type: 'success', target: 'creators', createdAt: '2024-03-10T10:00:00Z' },
  { id: 'sn-2', title: 'System Maintenance', message: 'The pSEO indexing engine will undergo scheduled optimization on Sunday at 02:00 UTC.', active: true, type: 'warning', target: 'all', createdAt: '2024-03-12T08:30:00Z' },
  { id: 'sn-3', title: 'Policy Update', message: 'Expert revenue share benchmarks have been updated in the System Configuration panel.', active: false, type: 'info', target: 'admins', createdAt: '2024-03-05T14:20:00Z' },
];

const mockNotificationLogs: NotificationLog[] = [
  { id: 'nl-1', timestamp: '2024-03-12T10:00:00Z', recipient: 'All Experts', type: 'Grant Announcement', status: 'sent', title: 'Q1 Research Grants Active' },
  { id: 'nl-2', timestamp: '2024-03-12T09:30:00Z', recipient: 'Eleanor Vance', type: 'Security Alert', status: 'sent', title: 'Unusual Login Attempt Detected' },
  { id: 'nl-3', timestamp: '2024-03-11T16:45:00Z', recipient: 'The Market Maven', type: 'Editorial Feedback', status: 'sent', title: 'Revision Requested: QE Analysis' },
  { id: 'nl-4', timestamp: '2024-03-11T14:20:00Z', recipient: 'All Users', type: 'Platform Update', status: 'failed', title: 'New pSEO Engine Launch' },
  { id: 'nl-5', timestamp: '2024-03-11T11:00:00Z', recipient: 'Sarah Crypto', type: 'Engagement Update', status: 'pending', title: 'Your article is trending!' },
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

const mockAdminActivityLogs: AdminActivityLog[] = [
  { id: 'al-1', admin: 'Eleanor Vance', action: 'User Suspension', target: 'Wealth Builder (u-4)', date: '2024-03-12T14:30:00Z', status: 'Success' },
  { id: 'al-2', admin: 'Platform Lead', action: 'System Config Update', target: 'pSEO Ingestion Engine', date: '2024-03-12T13:15:00Z', status: 'Success' },
  { id: 'al-3', admin: 'Eleanor Vance', action: 'Permission Override', target: 'Editor Cohort (role-2)', date: '2024-03-12T11:45:00Z', status: 'Failed' },
  { id: 'al-4', admin: 'Expert Editor', action: 'Content Purge', target: 'Article Node: Yield Scam 101', date: '2024-03-12T10:00:00Z', status: 'Success' },
  { id: 'al-5', admin: 'Platform Lead', action: 'Global Alert Dispatch', target: 'System Notification Hub', date: '2024-03-12T09:30:00Z', status: 'Success' },
  { id: 'al-6', admin: 'Eleanor Vance', action: 'Expert Verification', target: 'Sarah Crypto (u-6)', date: '2024-03-11T16:20:00Z', status: 'Success' },
];

const mockAuditTrailEntries: AuditTrailEntry[] = [
  { id: 'at-1', event: 'Global SEO Re-index', user: 'Eleanor Vance', module: 'pSEO Engine', date: '2024-03-12T14:30:00Z', status: 'Success' },
  { id: 'at-2', event: 'User Permission Shift', user: 'Platform Lead', module: 'Auth Kernel', date: '2024-03-12T13:15:00Z', status: 'Success' },
  { id: 'at-3', event: 'Backup Restoration Attempt', user: 'Eleanor Vance', module: 'Resilience Hub', date: '2024-03-12T11:45:00Z', status: 'Failed' },
  { id: 'at-4', event: 'High-Impact Content Purge', user: 'Expert Editor', module: 'Moderation', date: '2024-03-12T10:00:00Z', status: 'Success' },
  { id: 'at-5', event: 'API Gateway Scaling', user: 'System Bot', module: 'Infrastructure', date: '2024-03-12T09:30:00Z', status: 'Success' },
  { id: 'at-6', event: 'Financial Tool Hot-fix', user: 'Platform Dev', module: 'Calculators', date: '2024-03-11T16:20:00Z', status: 'Success' },
];

export const getPlatformSettings = async (): Promise<ApiResponse<PlatformSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockPlatformSettings,
    status: 200,
  };
};

export const updatePlatformSettings = async (settings: PlatformSettings): Promise<ApiResponse<PlatformSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: settings,
    status: 200,
    message: 'Global configuration synchronized.'
  };
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

export const getGlobalNotificationSettings = async (): Promise<ApiResponse<GlobalNotificationSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockGlobalNotificationSettings,
    status: 200,
  };
};

export const updateGlobalNotificationSettings = async (settings: GlobalNotificationSettings): Promise<ApiResponse<GlobalNotificationSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: settings,
    status: 200,
    message: 'Communication nodes synchronized across the cluster.'
  };
};

export const getSecuritySettings = async (): Promise<ApiResponse<SecuritySettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockSecuritySettings,
    status: 200,
  };
};

export const updateSecuritySettings = async (settings: SecuritySettings): Promise<ApiResponse<SecuritySettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: settings,
    status: 200,
    message: 'Security protocols updated and broadcast to all nodes.'
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

export const getNotificationLogs = async (): Promise<ApiResponse<NotificationLog[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockNotificationLogs,
    status: 200,
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
      uptimePercentage: 99.98,
      errorCountLast24h: 12,
      apiStatus: 'Healthy',
      latency: 42,
      history: Array.from({ length: 24 }, (_, i) => ({
        timestamp: `${i}:00`,
        load: Math.floor(Math.random() * 30) + 20,
        errors: Math.floor(Math.random() * 2)
      })),
      nodes: [
        { name: 'API Gateway Hub', status: 'Healthy', load: 24 },
        { name: 'pSEO Ingestion Node', status: 'Healthy', load: 68 },
        { name: 'Search Index Cluster', status: 'Warning', load: 82 },
        { name: 'Media Transformer', status: 'Healthy', load: 12 },
      ]
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

export const getAdminLogs = async (): Promise<ApiResponse<AdminActivityLog[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockAdminActivityLogs,
    status: 200,
  };
};

export const getAuditTrail = async (): Promise<ApiResponse<AuditTrailEntry[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockAuditTrailEntries,
    status: 200,
  };
};
