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
  geoBreakdown: [
    { country: string; users: number; percentage: number }
  ];
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

/**
 * Prompt 74: SEO Authority Dashboard Types
 */
export interface KeywordRankingNode {
  keyword: string;
  search_volume: number;
  ranking_position: number;
  ranking_change: string;
  target_article: string;
  category: string;
}

export interface BacklinkNode {
  source: string;
  authority: number;
  date: string;
  type: 'Do-Follow' | 'No-Follow';
}

export interface SeoOpportunityNode {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface SeoAnalytics {
  indexedPages: number;
  clickThroughRate: number;
  avgPosition: number;
  backlinks: number;
  total_organic_traffic: number;
  top_keywords_count: number;
  keywords: KeywordRankingNode[];
  backlink_sources: BacklinkNode[];
  opportunities: SeoOpportunityNode[];
  top_search_content: Array<{
    title: string;
    rank: number;
    traffic: number;
    backlinks: number;
    quality_score: number;
  }>;
  trends: { date: string; clicks: number; impressions: number; organic_traffic: number }[];
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

export interface TrendNode {
  date: string;
  count: number;
}

export interface EngagementTrends {
  likes: TrendNode[];
  comments: TrendNode[];
  shares: TrendNode[];
  combined: (TrendNode & { likes: number; comments: number; shares: number })[];
}

export interface FullAnalyticsOverview {
  platformOverview: PlatformOverview;
  dailyActiveUsers: DailyActiveUsers[];
  weeklyActiveUsers: WeeklyActiveUsers[];
  topContent: TopContent[];
  topCreators: TopCreator[];
  trafficTrends: TrafficTrends;
  engagementTrends: EngagementTrends;
}

/**
 * AI Asset Summary Types
 */
export interface AssetSummaryAIInsights {
  bull_case: string;
  bear_case: string;
  catalysts: string[];
  social_sentiment: number;
  confidence_score: number;
}

export interface AssetSummary {
  asset_name: string;
  symbol: string;
  current_price: number;
  daily_change_pct: number;
  market_cap: string;
  volume: number;
  risk_flag: 'Low' | 'Moderate' | 'High' | 'Critical';
  ai_insights: AssetSummaryAIInsights;
  price_history?: { date: string; price: number }[];
}

/**
 * AI Scenario Modeler Types
 */
export interface CaseAnalysis {
  summary: string;
  key_drivers?: string[]; // for bull
  key_risks?: string[];   // for bear
  confidence_score: number;
}

export interface AssetCase {
  asset_name: string;
  symbol: string;
  bull_case: CaseAnalysis;
  bear_case: CaseAnalysis;
}

/**
 * AI Event Intelligence Types (Prompt 32)
 */
export interface CatalystEvent {
  asset_name: string;
  symbol: string;
  type: string;
  date: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface EarningsSummaryDetail {
  asset_name: string;
  symbol: string;
  estimated_eps: number;
  actual_eps: number;
  estimated_revenue: string;
  actual_revenue: string;
  notes: string;
  date: string;
}

export interface EventIntelligenceData {
  catalysts: CatalystEvent[];
  earnings_summaries: EarningsSummaryDetail[];
}

/**
 * AI Trend & Recap Types (Prompt 33)
 */
export interface TrendExplanationItem {
  asset_name: string;
  symbol: string;
  trend: 'Uptrend' | 'Downtrend' | 'Sideways';
  explanation: string;
  confidence_score: number;
}

export interface RecapSummaryItem {
  date: string;
  top_movers: string[];
  top_laggers: string[];
  key_points: string[];
}

/**
 * ADMIN ANALYTICS MOCK DATA TYPES (Prompt 28)
 */

export interface UserActivityMetric {
  date: string;
  active_users: number;
  new_signups: number;
}

export interface EngagementMetrics {
  comments: number;
  upvotes: number;
  shares: number;
}

export interface RevenueMetric {
  date: string;
  amount: number;
}

export interface FeatureUsageMetric {
  feature: string;
  usage_count: number;
}

export interface ContentReportItem {
  id: string;
  type: 'article' | 'guide' | 'glossary_term';
  title: string;
  views: number;
  likes: number;
}

export interface AdminAnalyticsData {
  user_activity: UserActivityMetric[];
  engagement_metrics: EngagementMetrics;
  revenue_metrics: RevenueMetric[];
  feature_usage: FeatureUsageMetric[];
  content_reports: ContentReportItem[];
}

/**
 * PROMPT 77: PLATFORM ANALYTICS COMMAND CENTER TYPES
 */

export interface PlatformKPIs {
  total_articles: number;
  total_users: number;
  monthly_active_users: number;
  page_views: number;
  avg_session_duration: string;
  engagement_rate: string;
}

export interface TrafficSourceItem {
  source: string;
  percentage: string;
  value: number;
}

export interface TopPerformingArticle {
  title: string;
  category: string;
  views: number;
  read_time: string;
  engagement: string;
}

export interface RegionalUser {
  region: string;
  count: string | number;
  percent: number;
}

export interface SystemHealthAlert {
  id: string;
  type: 'traffic' | 'trending' | 'engagement' | 'performance';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface PlatformCommandCenterData {
  platform_metrics: PlatformKPIs;
  traffic_sources: TrafficSourceItem[];
  top_articles: TopPerformingArticle[];
  regional_users: RegionalUser[];
  system_alerts: SystemHealthAlert[];
  growth_trends: {
    articles: { date: string; count: number }[];
    topics: { date: string; count: number }[];
    contributors: { date: string; count: number }[];
  };
  engagement_vitals: {
    registrations: { date: string; count: number }[];
    returning: { date: string; count: number }[];
    interactions: { date: string; count: number }[];
  };
}
