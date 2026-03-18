/**
 * @fileOverview Type definitions for platform-wide analytics and monitoring.
 */

export interface VisitorStats {
  totalVisitors: number;
  activeUsers: number;
  pageViews: number;
  bounceRate: number;
  prevTotalVisitors: number;
  prevActiveUsers: number;
  prevPageViews: number;
}

export interface TrafficTrendNode {
  date: string;
  visitors: number;
  sessions: number;
}

export interface PageStats {
  url: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: string;
  bounceRate: number;
}

export interface UserActivityNode {
  hour: string;
  users: number;
}

export interface AdminAnalyticsKPI {
  metric: string;
  value: number;
  trend: 'up' | 'down';
}

export interface AdminAnalyticsData {
  user_activity: { date: string; active_users: number; new_signups: number }[];
  engagement_metrics: { comments: number; upvotes: number; shares: number };
  revenue_metrics: { date: string; amount: number }[];
  feature_usage: { feature: string; usage_count: number }[];
  content_reports: { id: string; type: 'article' | 'guide' | 'glossary_term'; title: string; views: number; likes: number }[];
}

// ... existing interfaces maintained for backward compatibility
export interface DailyActiveUsers { date: string; activeUsers: number; }
export interface WeeklyActiveUsers { week: string; activeUsers: number; }
export interface GrowthMetrics { newUsers: number; newCreators: number; newContent: number; growthOverTime: any[]; }
export interface TrafficAnalytics { activeUsers: number; pageViews: number; sessionDuration: number; bounceRate: number; deviceBreakdown: any; geoBreakdown: any; hourlyTraffic: any[]; }
export interface TrafficAnalyticsReport { dailyVisits: any[]; trafficSources: any[]; topPages: any[]; }
export interface TrafficTrends { dailyVisits: any[]; deviceBreakdown: any[]; countryVisits: any[]; }
export interface TrafficSources { sources: any[]; topReferrers: any[]; }
export interface TopContent { id: string; title: string; views: number; likes: number; shares: number; comments: number; category: string; }
export interface TopKeyword { id: string; keyword: string; page: string; rank: number; impressions: number; clicks: number; ctr: number; trend: string; history: any[]; }
export interface EngagementByCategory { category: string; views: number; likes: number; comments: number; shares: number; engagementRate: number; }
export interface EngagementTrends { likes: any[]; comments: any[]; shares: any[]; combined: any[]; }
export interface PlatformOverview { totalUsers: number; activeCreators: number; totalContent: number; totalTraffic: number; userGrowth: any[]; topContent: any[]; }
export interface ContentAnalyticsReport { totalViews: number; avgEngagement: number; totalArticles: number; avgReadTime: number; topContent: any[]; categoryBreakdown: any[]; }
export interface EngagementAnalytics { dau: any[]; wau: any[]; topUsers: any[]; stats: any; }
export interface ModerationAnalytics { id: string; content: string; creator: string; reportType: string; status: string; date: string; }
export interface CreatorEngagement { id: string; name: string; avatar: string; totalContent: number; likes: number; comments: number; shares: number; engagementRate: number; verified: boolean; }
export interface TrendingContent { id: string; title: string; views: number; likes: number; comments: number; shares: number; category: string; velocity: number; trendData: any[]; }
export interface FullAnalyticsOverview { platformOverview: any; dailyActiveUsers: any[]; weeklyActiveUsers: any[]; topContent: any[]; topCreators: any[]; trafficTrends: any; engagementTrends: any; }
export interface AssetSummary { asset_name: string; symbol: string; current_price: number; daily_change_pct: number; market_cap: string; volume: number; risk_flag: string; ai_insights: any; price_history?: any[]; }
export interface AssetCase { asset_name: string; symbol: string; bull_case: any; bear_case: any; }
export interface EventIntelligenceData { catalysts: any[]; earnings_summaries: any[]; }
export interface TrendExplanationItem { asset_name: string; symbol: string; trend: string; explanation: string; confidence_score: number; }
export interface RecapSummaryItem { date: string; top_movers: string[]; top_laggers: string[]; key_points: string[]; }
export interface PlatformCommandCenterData { platform_metrics: any; traffic_sources: any[]; top_articles: any[]; regional_users: any[]; system_alerts: any[]; growth_trends: any; engagement_vitals: any; }
