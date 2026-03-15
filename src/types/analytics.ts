/**
 * @fileOverview Type definitions for platform-wide analytics and monitoring.
 */

export interface TrafficAnalytics {
  activeUsers: number;
  pageViews: number;
  sessionDuration: number; // in seconds
  bounceRate: number; // percentage
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geoBreakdown: {
    country: string;
    users: number;
    percentage: number;
  }[];
  hourlyTraffic: {
    hour: string;
    sessions: number;
    views: number;
  }[];
}

export interface TrafficAnalyticsReport {
  dailyVisits: { date: string; visits: number }[];
  trafficSources: { source: string; percent: number }[];
  topPages: { page: string; visits: number; bounceRate: number }[];
}

export interface TrafficSources {
  sources: { 
    name: string; 
    percent: number; 
    trend: 'Up' | 'Down' | 'Stable';
    count: number;
  }[];
  topReferrers: { 
    source: string; 
    visits: number; 
    conversion: number;
    trend: 'Up' | 'Down' | 'Stable';
  }[];
}

export interface SeoPerformanceItem {
  id: string;
  page: string;
  keyword: string;
  rank: number;
  impressions: number;
  clicks: number;
  ctr: number;
  trend: 'up' | 'down' | 'stable';
}

export interface SeoAnalytics {
  indexedPages: number;
  clickThroughRate: number;
  avgPosition: number;
  backlinks: number;
  topKeywords: SeoPerformanceItem[];
  trends: { 
    date: string; 
    clicks: number; 
    impressions: number;
  }[];
}

export interface PlatformOverview {
  totalUsers: number;
  activeCreators: number;
  totalContent: number;
  totalTraffic: number;
  userGrowth: { date: string; users: number }[];
  topContent: Array<{
    id: string;
    title: string;
    author: string;
    views: number;
    engagement: number;
    status: string;
  }>;
}

export interface ContentPerformance {
  id: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  seoScore: number;
  category: string;
}

export interface ContentAnalyticsReport {
  totalViews: number;
  avgEngagement: number;
  totalArticles: number;
  avgReadTime: number;
  topContent: ContentPerformance[];
  categoryBreakdown: { category: string; views: number }[];
}

export interface EngagementAnalytics {
  dau: { date: string; users: number }[];
  wau: { week: string; users: number }[];
  topUsers: { 
    id: string; 
    name: string; 
    avatar: string; 
    actions: number; 
    level: 'High' | 'Medium' | 'Low';
    lastActive: string;
  }[];
  stats: {
    avgDailyActions: number;
    retentionRate: number;
    stickinessRatio: number;
  };
}

export interface ModerationAnalytics {
  id: string;
  content: string;
  creator: string;
  reportType: string;
  status: 'Pending' | 'Reviewed' | 'Action Taken';
  date: string;
}

export interface CreatorEngagement {
  id: string;
  name: string;
  avatar: string;
  totalContent: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  verified: boolean;
}
