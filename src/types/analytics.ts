/**
 * @fileOverview Type definitions for platform-wide analytics and monitoring.
 */

export interface DailyActiveUsers {
  date: string;
  activeUsers: number;
}

export interface WeeklyActiveUsers {
  week: string;
  activeUsers: number;
}

export interface GrowthMetrics {
  newUsers: number;
  newCreators: number;
  newContent: number;
  growthOverTime: { 
    date: string; 
    users: number; 
    creators: number; 
    content: number; 
  }[];
}

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

export interface TrafficTrends {
  dailyVisits: { date: string; visits: number }[];
  deviceBreakdown: { device: string; percent: number }[];
  countryVisits: { country: string; visits: number; change: number }[];
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

export interface TopKeyword {
  id: string;
  keyword: string;
  page: string;
  rank: number;
  impressions: number;
  clicks: number;
  ctr: number;
  trend: 'Up' | 'Down';
  history: { date: string; impressions: number }[];
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

export interface TopContent {
  id: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  category: string;
}

export interface TopCreator {
  id: string;
  name: string;
  avatar: string;
  totalContent: number;
  followers: number;
  engagementRate: number;
  revenue: number;
  verified: boolean;
  category: string;
}

export interface TrendingContent {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  category: string;
  velocity: number; // percentage growth
  trendData: { date: string; views: number }[];
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

export interface EngagementByCategory {
  category: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  engagementRate: number;
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
