import { ApiResponse } from '@/types';
import { 
  TrafficAnalytics, 
  SeoAnalytics, 
  PlatformOverview, 
  TrafficAnalyticsReport, 
  EngagementAnalytics, 
  ModerationAnalytics, 
  CreatorEngagement, 
  TrafficSources, 
  TrendingContent, 
  DailyActiveUsers, 
  WeeklyActiveUsers, 
  TopContent, 
  TopKeyword, 
  GrowthMetrics, 
  EngagementByCategory, 
  TrafficTrends, 
  EngagementTrends, 
  FullAnalyticsOverview, 
  AdminAnalyticsData,
  AssetSummary,
  AssetCase,
  EventIntelligenceData,
  TrendExplanationItem,
  RecapSummaryItem
} from '@/types/analytics';

/**
 * @fileOverview Consolidated mock service for platform analytics and trending data.
 * All duplicate identifiers have been removed to ensure build integrity.
 */

export interface TrendingItem {
  id: string;
  title: string;
  slug: string;
  views: number;
}

export interface DashboardMetrics {
  totalArticles: number;
  totalAuthors: number;
  activeUsers: number;
  calculatorsUsed: number;
  searchQueries: number;
  trends: {
    date: string;
    traffic: number;
    users: number;
    usage: number;
  }[];
}

const mockTrending: TrendingItem[] = [
  { id: 'art-1', title: 'Understanding Yield Curve Inversion', slug: 'understanding-yield-curve-inversion', views: 5000 },
  { id: 'term-1', title: 'Bull Market Definition', slug: 'bull-market', views: 3200 },
];

export const getTrendingArticles = async (): Promise<ApiResponse<TrendingItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockTrending,
    status: 200,
  };
};

export const getPopularTopics = async (): Promise<ApiResponse<string[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: ['Recession', 'Inflation', 'Web3', 'Passive Income', 'Dividends'],
    status: 200,
  };
};

export const getDashboardMetrics = async (): Promise<ApiResponse<DashboardMetrics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      totalArticles: 1248,
      totalAuthors: 156,
      activeUsers: 85400,
      calculatorsUsed: 42100,
      searchQueries: 125000,
      trends: [
        { date: '2024-03-01', traffic: 4200, users: 1200, usage: 800 },
        { date: '2024-03-02', traffic: 4500, users: 1350, usage: 950 },
        { date: '2024-03-03', traffic: 3800, users: 1100, usage: 700 },
        { date: '2024-03-04', traffic: 5200, users: 1600, usage: 1200 },
        { date: '2024-03-05', traffic: 6100, users: 1900, usage: 1500 },
        { date: '2024-03-06', traffic: 5800, users: 1850, usage: 1400 },
        { date: '2024-03-07', traffic: 6500, users: 2100, usage: 1800 },
      ]
    },
    status: 200
  };
};

export const getDAUData = async (): Promise<ApiResponse<DailyActiveUsers[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const dates = Array.from({ length: 27 }, (_, i) => {
    const d = new Date('2024-02-15');
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });
  
  const data = dates.map(date => ({
    date,
    activeUsers: Math.floor(Math.random() * 5000) + 12000
  }));

  return {
    data,
    status: 200
  };
};

export const getWAUData = async (): Promise<ApiResponse<WeeklyActiveUsers[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const data = [
    { week: 'W1', activeUsers: 45000 },
    { week: 'W2', activeUsers: 48500 },
    { week: 'W3', activeUsers: 52100 },
    { week: 'W4', activeUsers: 58400 },
    { week: 'W5', activeUsers: 61200 },
    { week: 'W6', activeUsers: 65800 },
  ];
  return { data, status: 200 };
};

export const getGrowthMetrics = async (): Promise<ApiResponse<GrowthMetrics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      newUsers: 1240,
      newCreators: 12,
      newContent: 85,
      growthOverTime: [
        { date: '2024-03-01', users: 100, creators: 1, content: 5 },
        { date: '2024-03-02', users: 150, creators: 2, content: 8 },
        { date: '2024-03-03', users: 120, creators: 1, content: 4 },
        { date: '2024-03-04', users: 200, creators: 3, content: 12 },
        { date: '2024-03-05', users: 250, creators: 2, content: 15 },
        { date: '2024-03-06', users: 220, creators: 1, content: 10 },
        { date: '2024-03-07', users: 300, creators: 2, content: 20 },
      ]
    },
    status: 200
  };
};

export const getTopContent = async (): Promise<ApiResponse<TopContent[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const data: TopContent[] = [
    { id: '1', title: 'Understanding Yield Curve Inversion', views: 45200, likes: 1240, shares: 580, comments: 320, category: 'Economics' },
    { id: '2', title: 'The Power of Compound Interest', views: 38900, likes: 2400, shares: 920, comments: 110, category: 'Investing' },
    { id: '3', title: 'Macro Trends in 2026', views: 31200, likes: 850, shares: 210, comments: 95, category: 'Economics' },
    { id: '4', title: 'DeFi Liquidity Pools Explained', views: 28400, likes: 850, shares: 210, comments: 140, category: 'Crypto' },
    { id: '5', title: 'Passive Income with Dividends', views: 42500, likes: 2100, shares: 920, comments: 450, category: 'Investing' },
    { id: '6', title: 'ESG Investing Strategies', views: 15600, likes: 420, shares: 120, comments: 85, category: 'Investing' },
    { id: '7', title: 'The Future of Central Banking', views: 52000, likes: 1540, shares: 430, comments: 210, category: 'Economics' },
  ].sort((a, b) => b.views - a.views);
  return { data, status: 200 };
};

export const getTrendingContent = async (): Promise<ApiResponse<TrendingContent[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dates = ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05', '2024-03-06', '2024-03-07'];
  const mockData: TrendingContent[] = [
    { 
      id: 'art-1', title: 'Understanding Yield Curve Inversion', views: 45200, likes: 1240, comments: 320, shares: 580, category: 'Economics', velocity: 24.5,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 5000) + 2000 }))
    },
    { 
      id: 'art-4', title: 'DeFi Liquidity Pools Explained', views: 28400, likes: 850, comments: 140, shares: 210, category: 'Crypto', velocity: 18.2,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 3000) + 1000 }))
    }
  ];
  return { data: mockData, status: 200 };
};

export const getTopKeywords = async (): Promise<ApiResponse<TopKeyword[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dates = ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05', '2024-03-06', '2024-03-07'];
  const mockData: TopKeyword[] = [
    { id: '1', keyword: 'Yield Curve Inversion', page: '/articles/yield-curve', rank: 1.2, impressions: 125000, clicks: 34200, ctr: 27.4, trend: 'Up', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 20000) + 10000 })) },
    { id: '2', keyword: 'Compound Interest Calc', page: '/financial-tools/compound-interest', rank: 2.1, impressions: 85400, clicks: 21800, ctr: 25.5, trend: 'Up', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 15000) + 8000 })) }
  ];
  return { data: mockData, status: 200 };
};

export const getCategoryEngagement = async (): Promise<ApiResponse<EngagementByCategory[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const data: EngagementByCategory[] = [
    { category: 'Economics', views: 450000, likes: 12400, comments: 2840, shares: 1560, engagementRate: 8.4 },
    { category: 'Investing', views: 380000, likes: 15600, comments: 1100, shares: 3200, engagementRate: 12.1 },
    { category: 'Crypto', views: 180000, likes: 5600, comments: 2400, shares: 4100, engagementRate: 15.2 }
  ].sort((a, b) => b.engagementRate - a.engagementRate);
  return { data, status: 200 };
};

export const getTrafficTrends = async (): Promise<ApiResponse<TrafficTrends>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });
  return {
    data: {
      dailyVisits: dates.map(date => ({ date, visits: Math.floor(Math.random() * 5000) + 10000 })),
      deviceBreakdown: [{ device: 'Desktop', percent: 58 }, { device: 'Mobile', percent: 35 }, { device: 'Tablet', percent: 7 }],
      countryVisits: [
        { country: 'United States', visits: 125400, change: 12.4 },
        { country: 'United Kingdom', visits: 45200, change: 8.2 }
      ]
    },
    status: 200
  };
};

export const getEngagementTrends = async (): Promise<ApiResponse<EngagementTrends>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });
  const combined = dates.map(date => {
    const likes = Math.floor(Math.random() * 500) + 200;
    const comments = Math.floor(Math.random() * 150) + 50;
    const shares = Math.floor(Math.random() * 100) + 20;
    return { date, likes, comments, shares, count: likes + comments + shares };
  });
  return {
    data: {
      likes: combined.map(c => ({ date: c.date, count: c.likes })),
      comments: combined.map(c => ({ date: c.date, count: c.comments })),
      shares: combined.map(c => ({ date: c.date, count: c.shares })),
      combined
    },
    status: 200
  };
};

export const getPlatformOverview = async (): Promise<ApiResponse<PlatformOverview>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: {
      totalUsers: 142500,
      activeCreators: 156,
      totalContent: 1248,
      totalTraffic: 4250000,
      userGrowth: [{ date: '2024-03-01', users: 141200 }, { date: '2024-03-10', users: 142500 }],
      topContent: [
        { id: '1', title: 'Quantitative Easing vs Tightening', author: 'The Market Maven', views: 45200, engagement: 8.4, status: 'Trending' }
      ]
    },
    status: 200
  };
};

export const getEngagementAnalytics = async (): Promise<ApiResponse<EngagementAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      dau: [{ date: '2024-03-07', users: 16800 }],
      wau: [{ week: 'W4', users: 58400 }],
      topUsers: [{ id: 'u-1', name: 'Eleanor Vance', avatar: 'https://picsum.photos/seed/eleanor/200/200', actions: 1240, level: 'High', lastActive: '2024-03-12T10:30:00Z' }],
      stats: { avgDailyActions: 14.5, retentionRate: 68.2, stickinessRatio: 42.1 }
    },
    status: 200
  };
};

export const getModerationAnalytics = async (): Promise<ApiResponse<ModerationAnalytics[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: [
      { id: 'm-1', content: 'Understanding Yield Curve Inversion', creator: 'marketmaven', reportType: 'Spam', status: 'Pending', date: '2024-03-12T10:30:00Z' }
    ],
    status: 200
  };
};

export const getCreatorEngagement = async (): Promise<ApiResponse<CreatorEngagement[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { id: 'creator-4', name: 'Eleanor Vance', avatar: 'https://picsum.photos/seed/eleanor/200/200', totalContent: 120, likes: 45200, comments: 8400, shares: 5200, engagementRate: 12.1, verified: true }
    ],
    status: 200
  };
};

export const getAdminAnalyticsData = async (): Promise<ApiResponse<AdminAnalyticsData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const dates = ['2024-03-12'];
  return {
    data: {
      user_activity: dates.map(date => ({ date, active_users: 150, new_signups: 10 })),
      engagement_metrics: { comments: 1240, upvotes: 4520, shares: 850 },
      revenue_metrics: dates.map(date => ({ date, amount: 500 })),
      feature_usage: [{ feature: 'Watchlist Hub', usage_count: 12400 }],
      content_reports: [{ id: '1', type: 'article', title: 'Yield Curve Inversion 2026', views: 45200, likes: 1240 }]
    },
    status: 200
  };
};

export const getAssetSummaries = async (): Promise<ApiResponse<AssetSummary[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      {
        asset_name: "NVIDIA Corp", symbol: "NVDA", current_price: 875.25, daily_change_pct: 2.3, market_cap: "2.1T", volume: 45200000, risk_flag: "Moderate",
        ai_insights: { bull_case: "AI dominance", bear_case: "High valuation", catalysts: ["Earnings"], social_sentiment: 0.82, confidence_score: 0.88 }
      }
    ],
    status: 200
  };
};

export const getAssetCases = async (query?: string): Promise<ApiResponse<AssetCase[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: [
      { asset_name: "Tesla Inc.", symbol: "TSLA", bull_case: { summary: "FSD growth", confidence_score: 0.75 }, bear_case: { summary: "Margin decay", confidence_score: 0.85 } }
    ],
    status: 200
  };
};

export const getEventIntelligence = async (): Promise<ApiResponse<EventIntelligenceData>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      catalysts: [{ asset_name: "NVIDIA", symbol: "NVDA", type: "Conference", date: "2026-03-25", impact: "High" }],
      earnings_summaries: [{ asset_name: "Microsoft", symbol: "MSFT", estimated_eps: 2.80, actual_eps: 2.95, estimated_revenue: "62B", actual_revenue: "64.2B", notes: "Cloud continues", date: "2026-03-10" }]
    },
    status: 200
  };
};

export const getTrendExplanations = async (): Promise<ApiResponse<TrendExplanationItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [{ asset_name: "XYZ Corp", symbol: "XYZ", trend: "Uptrend", explanation: "Earnings beat", confidence_score: 0.88 }],
    status: 200
  };
};

export const getRecapSummaries = async (): Promise<ApiResponse<RecapSummaryItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [{ date: "2026-03-15", top_movers: ["XYZ +3.5%"], top_laggers: ["ABC -2.1%"], key_points: ["Market shifts"] }],
    status: 200
  };
};

export const getTrafficAnalytics = async (): Promise<ApiResponse<TrafficAnalytics | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      activeUsers: 1240, pageViews: 45200, sessionDuration: 402, bounceRate: 32.4, deviceBreakdown: { desktop: 58, mobile: 35, tablet: 7 },
      geoBreakdown: [{ country: 'United States', users: 45200, percentage: 45.2 }],
      hourlyTraffic: [{ hour: '12:00', sessions: 200, views: 600 }]
    },
    status: 200
  };
};

export const getTrafficAnalyticsReport = async (): Promise<ApiResponse<TrafficAnalyticsReport | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      dailyVisits: [{ date: '2024-03-01', visits: 5000 }],
      trafficSources: [{ source: 'Google', percent: 45 }],
      topPages: [{ page: '/articles/yield-curve', visits: 12400, bounceRate: 24.2 }]
    },
    status: 200
  };
};

export const getSeoAnalytics = async (): Promise<ApiResponse<SeoAnalytics | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: {
      indexedPages: 145000, total_organic_traffic: 820000, top_keywords_count: 3200, backlinks: 48000, avgPosition: 8.4, clickThroughRate: 4.2,
      keywords: [{ keyword: "Inflation", search_volume: 90500, ranking_position: 3, ranking_change: "+1", target_article: "Understanding Inflation", category: "Economics" }],
      backlink_sources: [{ source: "bloomberg.com", authority: 94, date: "2024-03-12", type: "Do-Follow" }],
      opportunities: [{ title: "Trending Node", description: "Rising keywords", priority: "High" }],
      top_search_content: [{ title: "Understanding Inflation", rank: 3, traffic: 125000, backlinks: 1240, quality_score: 94 }],
      trends: [{ date: '2024-03-01', clicks: 1000, impressions: 40000, organic_traffic: 25000 }]
    },
    status: 200
  };
};

export const getFullAnalyticsOverview = async (): Promise<ApiResponse<FullAnalyticsOverview>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const [platform, dau, wau, content, creators, traffic, engagement] = await Promise.all([
    getPlatformOverview(), getDAUData(), getWAUData(), getTopContent(), getTopCreators(), getTrafficTrends(), getEngagementTrends()
  ]);
  return {
    data: {
      platformOverview: platform.data!, dailyActiveUsers: dau.data!, weeklyActiveUsers: wau.data!, topContent: content.data!,
      topCreators: creators.data!, trafficTrends: traffic.data!, engagementTrends: engagement.data!
    },
    status: 200
  };
};

export const getContentAnalytics = async (): Promise<ApiResponse<any>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      totalViews: 4250000, avgEngagement: 8.4, totalArticles: 1248,
      topArticles: [{ articleId: '1', title: 'Understanding Yield Curve Inversion', views: 45200, likes: 1240, shares: 580, comments: 320, seoScore: 92, category: 'Economics' }],
      topCategories: [{ category: 'Economics', views: 1250000 }]
    },
    status: 200
  };
};
