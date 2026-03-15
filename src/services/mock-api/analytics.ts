import { ApiResponse } from '@/types';
import { 
  TrafficAnalytics, 
  SeoAnalytics, 
  PlatformOverview, 
  TrafficAnalyticsReport, 
  ContentAnalytics, 
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
  TopCreator,
  AdminAnalyticsData,
  AssetSummary,
  AssetCase,
  EventIntelligenceData,
  TrendExplanationItem,
  RecapSummaryItem
} from '@/types/analytics';

/**
 * @fileOverview Mock service for platform analytics and trending data.
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
  const dates = [
    '2024-02-15', '2024-02-16', '2024-02-17', '2024-02-18', '2024-02-19', 
    '2024-02-20', '2024-02-21', '2024-02-22', '2024-02-23', '2024-02-24', 
    '2024-02-25', '2024-02-26', '2024-02-27', '2024-02-28', '2024-02-29',
    '2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05',
    '2024-03-06', '2024-03-07', '2024-03-08', '2024-03-09', '2024-03-10',
    '2024-03-11', '2024-03-12'
  ];
  
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
      id: 'art-1', 
      title: 'Understanding Yield Curve Inversion', 
      views: 45200, 
      likes: 1240, 
      comments: 320, 
      shares: 580, 
      category: 'Economics', 
      velocity: 24.5,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 5000) + 2000 }))
    },
    { 
      id: 'art-4', 
      title: 'DeFi Liquidity Pools Explained', 
      views: 28400, 
      likes: 850, 
      comments: 140, 
      shares: 210, 
      category: 'Crypto', 
      velocity: 18.2,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 3000) + 1000 }))
    },
    { 
      id: 'art-5', 
      title: 'Passive Income with Dividends', 
      views: 42500, 
      likes: 2100, 
      comments: 450, 
      shares: 920, 
      category: 'Investing', 
      velocity: 12.1,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 4000) + 1500 }))
    },
    { 
      id: 'art-7', 
      title: 'The Future of Central Banking', 
      views: 52000, 
      likes: 1540, 
      comments: 210, 
      shares: 430, 
      category: 'Economics', 
      velocity: 35.8,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 6000) + 3000 }))
    },
    { 
      id: 'art-10', 
      title: 'Real Estate Tokenization 101', 
      views: 15600, 
      likes: 420, 
      comments: 85, 
      shares: 120, 
      category: 'Crypto', 
      velocity: 45.2,
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 200) + 500 }))
    }
  ];

  return { data: mockData, status: 200 };
};

export const getTopKeywords = async (): Promise<ApiResponse<TopKeyword[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dates = ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05', '2024-03-06', '2024-03-07'];
  
  const mockData: TopKeyword[] = [
    { id: '1', keyword: 'Yield Curve Inversion', page: '/articles/yield-curve', rank: 1.2, impressions: 125000, clicks: 34200, ctr: 27.4, trend: 'Up', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 20000) + 10000 })) },
    { id: '2', keyword: 'Compound Interest Calc', page: '/financial-tools/compound-interest', rank: 2.1, impressions: 85400, clicks: 21800, ctr: 25.5, trend: 'Up', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 15000) + 8000 })) },
    { id: '3', keyword: 'Recession Indicators', page: '/tags/recession', rank: 3.4, impressions: 62000, clicks: 12400, some: 20.0, trend: 'Down', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 10000) + 5000 })) } as any,
    { id: '4', keyword: 'Passive Income Strategies', page: '/articles/dividend-income', rank: 4.8, impressions: 45000, clicks: 8200, ctr: 18.2, trend: 'Up', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 8000) + 4000 })) },
    { id: '5', keyword: 'Bull Market Definition', page: '/glossary/bull-market', rank: 1.5, impressions: 38000, clicks: 9500, ctr: 25.0, trend: 'Down', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 6000) + 3000 })) },
  ];

  return { data: mockData, status: 200 };
};

export const getCategoryEngagement = async (): Promise<ApiResponse<EngagementByCategory[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const data: EngagementByCategory[] = [
    { category: 'Economics', views: 450000, likes: 12400, comments: 2840, shares: 1560, engagementRate: 8.4 },
    { category: 'Investing', views: 380000, likes: 15600, comments: 1100, shares: 3200, engagementRate: 12.1 },
    { category: 'Markets', views: 220000, likes: 8200, comments: 950, shares: 1200, engagementRate: 6.8 },
    { category: 'Crypto', views: 180000, likes: 5600, comments: 2400, shares: 4100, engagementRate: 15.2 },
    { category: 'Personal Finance', views: 125000, likes: 4200, comments: 310, shares: 850, engagementRate: 4.5 },
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
      dailyVisits: dates.map(date => ({
        date,
        visits: Math.floor(Math.random() * 5000) + 10000
      })),
      deviceBreakdown: [
        { device: 'Desktop', percent: 58 },
        { device: 'Mobile', percent: 35 },
        { device: 'Tablet', percent: 7 }
      ],
      countryVisits: [
        { country: 'United States', visits: 125400, change: 12.4 },
        { country: 'United Kingdom', visits: 45200, change: 8.2 },
        { country: 'Canada', visits: 31800, change: -2.1 },
        { country: 'Germany', visits: 28400, change: 15.6 },
        { country: 'Australia', visits: 22100, change: 4.5 },
        { country: 'India', visits: 18500, change: 24.8 },
        { country: 'Singapore', visits: 12400, change: 11.2 },
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

export const getFullAnalyticsOverview = async (): Promise<ApiResponse<FullAnalyticsOverview>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const [platform, dau, wau, content, creators, traffic, engagement] = await Promise.all([
    getPlatformOverview(),
    getDAUData(),
    getWAUData(),
    getTopContent(),
    getTopCreators(),
    getTrafficTrends(),
    getEngagementTrends()
  ]);

  return {
    data: {
      platformOverview: platform.data!,
      dailyActiveUsers: dau.data!,
      weeklyActiveUsers: wau.data!,
      topContent: content.data!,
      topCreators: creators.data!,
      trafficTrends: traffic.data!,
      engagementTrends: engagement.data!
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
      userGrowth: [
        { date: '2024-02-15', users: 138000 },
        { date: '2024-02-20', users: 139500 },
        { date: '2024-02-25', users: 140800 },
        { date: '2024-03-01', users: 141200 },
        { date: '2024-02-05', users: 141900 },
        { date: '2024-03-10', users: 142500 },
      ],
      topContent: [
        { id: '1', title: 'Quantitative Easing vs Tightening', author: 'The Market Maven', views: 45200, engagement: 8.4, status: 'Trending' },
        { id: '2', title: 'The Power of Compound Interest', author: 'Julian Wealth', views: 38900, engagement: 12.1, status: 'Viral' },
      ]
    },
    status: 200
  };
};

export const getEngagementAnalytics = async (): Promise<ApiResponse<EngagementAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      dau: [
        { date: '2024-03-01', users: 12400 },
        { date: '2024-03-02', users: 13100 },
        { date: '2024-03-03', users: 11800 },
        { date: '2024-03-04', users: 14200 },
        { date: '2024-03-05', users: 15600 },
        { date: '2024-03-06', users: 15100 },
        { date: '2024-03-07', users: 16800 },
      ],
      wau: [
        { week: 'W1', users: 45000 },
        { week: 'W2', users: 48500 },
        { week: 'W3', users: 52100 },
        { week: 'W4', users: 58400 },
      ],
      topUsers: [
        { id: 'u-1', name: 'Eleanor Vance', avatar: 'https://picsum.photos/seed/eleanor/200/200', actions: 1240, level: 'High', lastActive: '2024-03-12T10:30:00Z' },
        { id: 'u-2', name: 'Julian Wealth', avatar: 'https://picsum.photos/seed/wealth/200/200', actions: 850, level: 'High', lastActive: '2024-03-12T09:15:00Z' },
        { id: 'u-3', name: 'Sarah Crypto', avatar: 'https://picsum.photos/seed/defi/200/200', actions: 420, level: 'Medium', lastActive: '2024-03-11T16:45:00Z' },
        { id: 'u-4', name: 'Reader_42', avatar: 'https://picsum.photos/seed/r1/200/200', actions: 310, level: 'Medium', lastActive: '2024-03-12T11:00:00Z' },
        { id: 'u-5', name: 'Dan Income', avatar: 'https://picsum.photos/seed/dan/200/200', actions: 120, level: 'Low', lastActive: '2024-03-10T14:20:00Z' },
      ],
      stats: {
        avgDailyActions: 14.5,
        retentionRate: 68.2,
        stickinessRatio: 42.1
      }
    },
    status: 200
  };
};

export const getModerationAnalytics = async (): Promise<ApiResponse<ModerationAnalytics[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: [
      { id: 'm-1', content: 'Understanding Yield Curve Inversion', creator: 'marketmaven', reportType: 'Spam', status: 'Pending', date: '2024-03-12T10:30:00Z' },
      { id: 'm-2', content: 'Macro Trends in 2026', creator: 'econvance', reportType: 'Fact Check', status: 'Reviewed', date: '2024-03-11T16:45:00Z' },
      { id: 'm-3', content: 'DeFi Liquidity Pools', creator: 'defianalyst', reportType: 'Plagiarism', status: 'Action Taken', date: '2024-03-10T09:15:00Z' },
      { id: 'm-4', content: 'Passive Income with Dividends', creator: 'dividenddan', reportType: 'Inaccurate Data', status: 'Pending', date: '2024-03-12T11:00:00Z' },
      { id: 'm-5', content: 'Institutional Yield Strategies', creator: 'wealthbuilder', reportType: 'Copyright', status: 'Reviewed', date: '2024-03-11T14:20:00Z' },
    ],
    status: 200
  };
};

export const getCreatorEngagement = async (): Promise<ApiResponse<CreatorEngagement[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { id: 'creator-1', name: 'The Market Maven', avatar: 'https://picsum.photos/seed/maven/200/200', totalContent: 42, likes: 12400, comments: 2840, shares: 1560, engagementRate: 8.4, verified: true },
      { id: 'creator-4', name: 'Eleanor Vance', avatar: 'https://picsum.photos/seed/eleanor/200/200', totalContent: 120, likes: 45200, comments: 8400, shares: 5200, engagementRate: 12.1, verified: true },
      { id: 'creator-2', name: 'Julian Wealth', avatar: 'https://picsum.photos/seed/wealth/200/200', totalContent: 15, likes: 5600, comments: 1100, shares: 820, engagementRate: 6.8, verified: true },
      { id: 'creator-3', name: 'Sarah Crypto', avatar: 'https://picsum.photos/seed/defi/200/200', totalContent: 8, likes: 2100, comments: 450, shares: 310, engagementRate: 4.2, verified: false },
      { id: 'creator-8', name: 'Dan Income', avatar: 'https://picsum.photos/seed/dan/200/200', totalContent: 35, likes: 8200, comments: 1540, shares: 920, engagementRate: 7.1, verified: true },
    ],
    status: 200
  };
};

export const getAdminAnalyticsData = async (): Promise<ApiResponse<AdminAnalyticsData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().split('T')[0];
  });

  return {
    data: {
      user_activity: dates.map(date => ({
        date,
        active_users: Math.floor(Math.random() * 50) + 100,
        new_signups: Math.floor(Math.random() * 10) + 5
      })),
      engagement_metrics: {
        comments: 1240,
        upvotes: 4520,
        shares: 850
      },
      revenue_metrics: dates.map(date => ({
        date,
        amount: Math.floor(Math.random() * 200) + 400
      })),
      feature_usage: [
        { feature: 'Watchlist Hub', usage_count: 12400 },
        { feature: 'Portfolio Architect', usage_count: 8500 },
        { feature: 'AI Analyst Suite', usage_count: 6200 },
        { feature: 'Glossary Index', usage_count: 4100 },
        { feature: 'ROI Engines', usage_count: 3200 },
      ],
      content_reports: [
        { id: '1', type: 'article', title: 'Yield Curve Inversion 2026', views: 45200, likes: 1240 },
        { id: '2', type: 'glossary_term', title: 'Quantitative Easing', views: 38900, likes: 850 },
        { id: '3', type: 'guide', title: 'Retirement Scaling 101', views: 24500, likes: 620 },
        { id: '4', type: 'article', title: 'DeFi Liquidity Audit', views: 18200, likes: 410 },
        { id: '5', type: 'article', title: 'Passive Incomesuper-cycle', views: 15400, likes: 380 },
      ]
    },
    status: 200
  };
};

export const getAssetSummaries = async (): Promise<ApiResponse<AssetSummary[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  return {
    data: [
      {
        asset_name: "NVIDIA Corp",
        symbol: "NVDA",
        current_price: 875.25,
        daily_change_pct: 2.3,
        market_cap: "2.1T",
        volume: 45200000,
        risk_flag: "Moderate",
        ai_insights: {
          bull_case: "NVDA is positioned to dominate the AI hardware cycle with its H100 and upcoming Blackwell architecture. Institutional demand remains at a multi-year peak.",
          bear_case: "Supply chain concentration in Taiwan and high valuation multiples pose significant drawdown risks in a macro downturn or chip-glut scenario.",
          catalysts: ["Blackwell GPU Mass Shipments", "Q1 FY25 Earnings Call", "CSP Capex Expansion Updates"],
          social_sentiment: 0.82,
          confidence_score: 0.88
        },
        price_history: dates.map(d => ({ date: d, price: 800 + Math.random() * 100 }))
      },
      {
        asset_name: "Bitcoin",
        symbol: "BTC",
        current_price: 64250.00,
        daily_change_pct: -1.2,
        market_cap: "1.2T",
        volume: 2400000000,
        risk_flag: "High",
        ai_insights: {
          bull_case: "Institutional adoption via Spot ETFs and the post-halving supply crunch create a structural demand imbalance that favors long-term upside.",
          bear_case: "Regulatory headwinds from the SEC and potential macro liquidity tightening (QT) could trigger cascading liquidations in over-leveraged markets.",
          catalysts: ["Halving Block Reward Realization", "FASB Accounting Rule Implementation", "Global Hashrate Migration"],
          social_sentiment: 0.65,
          confidence_score: 0.75
        },
        price_history: dates.map(d => ({ date: d, price: 60000 + Math.random() * 5000 }))
      },
      {
        asset_name: "Apple Inc.",
        symbol: "AAPL",
        current_price: 182.50,
        daily_change_pct: 0.45,
        market_cap: "2.8T",
        volume: 58000000,
        risk_flag: "Low",
        ai_insights: {
          bull_case: "Services revenue growth and the integration of 'Apple Intelligence' across the hardware ecosystem provide a high-margin floor for the stock.",
          bear_case: "Decelerating iPhone demand in China and antitrust litigation in the EU could cap multiple expansion in the near-term.",
          catalysts: ["WWDC Developer Announcements", "iPhone 16 Component Orders", "Stock Buyback Cycle Update"],
          social_sentiment: 0.58,
          confidence_score: 0.92
        },
        price_history: dates.map(d => ({ date: d, price: 175 + Math.random() * 10 }))
      }
    ],
    status: 200
  };
};

export const getAssetCases = async (query?: string): Promise<ApiResponse<AssetCase[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: [
      {
        asset_name: "XYZ Corp",
        symbol: "XYZ",
        bull_case: {
          summary: "XYZ expected to outperform due to strong product demand and sector growth.",
          key_drivers: ["Earnings growth", "New market expansion", "Positive sentiment"],
          confidence_score: 0.82
        },
        bear_case: {
          summary: "XYZ may underperform due to regulatory challenges and market volatility.",
          key_risks: ["Regulatory risk", "Sector slowdown", "High competition"],
          confidence_score: 0.68
        }
      },
      {
        asset_name: "Tesla Inc.",
        symbol: "TSLA",
        bull_case: {
          summary: "Expansion into energy storage and autonomous driving software provides a high-multiple floor for the stock.",
          key_drivers: ["FSD version 12 rollout", "Megapack utility scale growth", "Model 2 manufacturing efficiencies"],
          confidence_score: 0.75
        },
        bear_case: {
          summary: "Declining margins in core EV manufacturing and heavy competition in the Chinese market pose near-term headwinds.",
          key_risks: ["Inventory backlog", "Consumer spending shift", "Hardware commoditization"],
          confidence_score: 0.85
        }
      }
    ],
    status: 200
  };
};

export const getEventIntelligence = async (): Promise<ApiResponse<EventIntelligenceData>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      catalysts: [
        { asset_name: "XYZ Corp", symbol: "XYZ", type: "Earnings", date: "2026-03-20", impact: "High" },
        { asset_name: "ABC Inc", symbol: "ABC", type: "Product Launch", date: "2026-03-22", impact: "Medium" },
        { asset_name: "NVIDIA", symbol: "NVDA", type: "Conference", date: "2026-03-25", impact: "High" },
        { asset_name: "Tesla", symbol: "TSLA", type: "Regulatory News", date: "2026-03-28", impact: "Medium" },
      ],
      earnings_summaries: [
        { asset_name: "XYZ Corp", symbol: "XYZ", estimated_eps: 1.25, actual_eps: 1.35, estimated_revenue: "500M", actual_revenue: "520M", notes: "Positive earnings surprise", date: "2026-03-14" },
        { asset_name: "ABC Inc", symbol: "ABC", estimated_eps: 0.75, actual_eps: 0.70, estimated_revenue: "300M", actual_revenue: "295M", notes: "Slight miss on EPS", date: "2026-03-12" },
        { asset_name: "Microsoft", symbol: "MSFT", estimated_eps: 2.80, actual_eps: 2.95, estimated_revenue: "62B", actual_revenue: "64.2B", notes: "Cloud acceleration continues", date: "2026-03-10" },
      ]
    },
    status: 200
  };
};

export const getTrendExplanations = async (): Promise<ApiResponse<TrendExplanationItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { asset_name: "XYZ Corp", symbol: "XYZ", trend: "Uptrend", explanation: "Strong buying momentum after positive earnings beat and revised forward guidance. Institutional accumulation nodes detected at $55 support level.", confidence_score: 0.88 },
      { asset_name: "ABC Inc", symbol: "ABC", trend: "Downtrend", explanation: "Selling pressure due to sector-wide slowdown and regulatory headwinds in the APAC region. Support re-test expected at 200-day moving average.", confidence_score: 0.72 },
      { asset_name: "Bitcoin", symbol: "BTC", trend: "Sideways", explanation: "Consolidation phase between major liquidity zones. Low volatility clusters suggest a breakout is imminent as open interest builds.", confidence_score: 0.65 }
    ],
    status: 200
  };
};

export const getRecapSummaries = async (): Promise<ApiResponse<RecapSummaryItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      {
        date: "2026-03-15",
        top_movers: ["XYZ +3.5%", "NVDA +2.8%", "ETH +4.2%"],
        top_laggers: ["ABC -2.1%", "TSLA -1.5%", "AAPL -0.8%"],
        key_points: ["XYZ posted strong earnings beat", "Sector rotation toward AI and Semiconductors", "Crude oil volatility spiked due to geopolitical shifts"]
      },
      {
        date: "2026-03-14",
        top_movers: ["GHI +4.0%", "JKL +3.2%", "BTC +1.5%"],
        top_laggers: ["MNO -2.5%", "PQR -1.8%", "GLD -0.5%"],
        key_points: ["Market volatility increased significantly", "Investors shifted to safe-haven assets", "Unemployment data came in cooler than consensus"]
      }
    ],
    status: 200
  };
};

export const getTrafficAnalytics = async (): Promise<ApiResponse<TrafficAnalytics | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      activeUsers: 1240,
      pageViews: 45200,
      sessionDuration: 402,
      bounceRate: 32.4,
      deviceBreakdown: { desktop: 58, mobile: 35, tablet: 7 },
      geoBreakdown: [
        { country: 'United States', users: 45200, percentage: 45.2 },
        { country: 'United Kingdom', users: 12400, percentage: 12.4 }
      ],
      hourlyTraffic: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        sessions: Math.floor(Math.random() * 500) + 100,
        views: Math.floor(Math.random() * 1500) + 500
      }))
    },
    status: 200
  };
};

export const getTrafficAnalyticsReport = async (): Promise<ApiResponse<TrafficAnalyticsReport | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      dailyVisits: Array.from({ length: 7 }, (_, i) => ({
        date: `2024-03-0${i + 1}`,
        visits: Math.floor(Math.random() * 2000) + 5000
      })),
      trafficSources: [
        { source: 'Google', percent: 45 },
        { source: 'Direct', percent: 25 },
        { source: 'Twitter', percent: 15 },
        { source: 'Other', percent: 15 }
      ],
      topPages: [
        { page: '/articles/yield-curve', visits: 12400, bounceRate: 24.2 },
        { page: '/glossary/bull-market', visits: 8500, bounceRate: 31.5 }
      ]
    },
    status: 200
  };
};

export const getSeoAnalytics = async (): Promise<ApiResponse<SeoAnalytics | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      indexedPages: 1248500,
      clickThroughRate: 4.2,
      avgPosition: 12.4,
      backlinks: 45200,
      topKeywords: [],
      trends: [
        { date: '2024-03-01', clicks: 1200, impressions: 45000 },
        { date: '2024-03-07', clicks: 1500, impressions: 52000 }
      ] as any
    },
    status: 200
  };
};

export const getContentAnalytics = async (): Promise<ApiResponse<any>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      totalViews: 4250000,
      avgEngagement: 8.4,
      totalArticles: 1248,
      topArticles: [
        { articleId: '1', title: 'Understanding Yield Curve Inversion', views: 45200, likes: 1240, shares: 580, comments: 320, seoScore: 92, category: 'Economics' },
        { articleId: '2', title: 'The Power of Compound Interest', views: 38900, likes: 2400, shares: 920, comments: 110, seoScore: 88, category: 'Investing' }
      ],
      topCategories: [
        { category: 'Economics', views: 1250000 },
        { category: 'Investing', views: 980000 }
      ]
    },
    status: 200
  };
};
