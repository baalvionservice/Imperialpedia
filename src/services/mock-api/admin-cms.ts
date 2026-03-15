
import { ApiResponse } from '@/types';

/**
 * @fileOverview Specialized mock service for the Admin CMS Dashboard.
 * Provides structured data for content, roles, analytics, and infrastructure.
 */

export interface CmsContentItem {
  id: string;
  type: 'article' | 'glossary_term' | 'guide';
  title?: string;
  term?: string;
  status: 'draft' | 'review' | 'published' | 'approved';
}

export interface CmsRole {
  role: string;
  permissions: string[];
  userCount: number;
}

export interface CmsAnalytics {
  user_activity: { date: string; active_users: number }[];
  revenue: { date: string; amount: number }[];
  system_logs: string[];
  ai_accuracy: number;
}

export interface CmsDashboardData {
  content_editor: CmsContentItem[];
  roles_permissions: CmsRole[];
  analytics: CmsAnalytics;
  deployment_status: { last_deploy: string; status: string; version: string };
  backup_status: { last_backup: string; status: string; size: string };
  cache_status: { hit_rate: string; status: string };
}

const mockCmsData: CmsDashboardData = {
  content_editor: [
    { id: '1', type: 'article', title: 'Understanding QE 2026', status: 'draft' },
    { id: '2', type: 'glossary_term', term: 'Stagflation', status: 'review' },
    { id: '3', type: 'article', title: 'Macro Trends in APAC', status: 'approved' },
    { id: '4', type: 'guide', title: 'Portfolio Rebalancing 101', status: 'published' },
  ],
  roles_permissions: [
    { role: 'Administrator', permissions: ['edit', 'publish', 'delete', 'manage_users', 'system_config'], userCount: 5 },
    { role: 'Editor', permissions: ['edit', 'publish', 'review'], userCount: 12 },
    { role: 'Expert', permissions: ['create', 'edit_own', 'analytics'], userCount: 156 },
  ],
  analytics: {
    user_activity: [
      { date: '2024-03-08', active_users: 11200 },
      { date: '2024-03-09', active_users: 11500 },
      { date: '2024-03-10', active_users: 10800 },
      { date: '2024-03-11', active_users: 12400 },
      { date: '2024-03-12', active_users: 13200 },
    ],
    revenue: [
      { date: '2024-03-08', amount: 4200 },
      { date: '2024-03-09', amount: 4500 },
      { date: '2024-03-10', amount: 3800 },
      { date: '2024-03-11', amount: 5200 },
      { date: '2024-03-12', amount: 6100 },
    ],
    system_logs: [
      "User 'market_maven' submitted article node 'QE 2026'",
      "Administrator 'e_vance' updated system role 'Editor'",
      "Backup snapshot 'bak-8F2D' sealed successfully",
      "pSEO Engine re-indexed 14,200 nodes",
      "Critical: API Latency spike detected in Cluster Alpha"
    ],
    ai_accuracy: 0.924
  },
  deployment_status: {
    last_deploy: '2024-03-12T10:30:00Z',
    status: 'success',
    version: 'v4.2.0-broadcast'
  },
  backup_status: {
    last_backup: '2024-03-12T04:00:00Z',
    status: 'success',
    size: '1.42GB'
  },
  cache_status: {
    hit_rate: '98.4%',
    status: 'optimal'
  }
};

export const getCmsDashboardData = async (): Promise<ApiResponse<CmsDashboardData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: mockCmsData,
    status: 200,
  };
};
