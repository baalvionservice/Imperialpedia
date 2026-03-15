import { ApiResponse } from '@/types';
import { TrafficAnalytics, SeoAnalytics, PlatformOverview, TrafficAnalyticsReport, ContentAnalytics, EngagementAnalytics, ModerationAnalytics, CreatorEngagement, TrafficSources, TrendingContent, DailyActiveUsers, WeeklyActiveUsers, TopContent, TopKeyword, GrowthMetrics, EngagementByCategory, TrafficTrends, EngagementTrends, FullAnalyticsOverview, TopCreator } from '@/types/analytics';

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
      trendData: dates.map(d => ({ date: d, views: Math.floor(Math.random() * 2000) + 500 }))
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
    { id: '3', keyword: 'Recession Indicators', page: '/tags/recession', rank: 3.4, impressions: 62000, clicks: 12400, ctr: 20.0, trend: 'Down', history: dates.map(d => ({ date: d, impressions: Math.floor(Math.random() * 10000) + 5000 })) },
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
      { id: 'm-4', content: 'Re: Passive Income', creator: 'ReaderNode_42', reportType: 'Harassment', status: 'Pending', date: '2024-03-12T11:00:00Z' },
      { id: 'm-5', content: 'Expert Profile: Ken Macro', creator: 'kenmacro', reportType: 'Impersonation', status: 'Reviewed', date: '2024-03-11T14:20:00Z' },
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

export const getTopCreators = async (): Promise<ApiResponse<TopCreator[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data: TopCreator[] = mockAdminCreatorAnalytics.map(c => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    totalContent: c.contentCount,
    followers: c.followers,
    engagementRate: c.engagementRate,
    revenue: c.totalRevenue,
    verified: c.verified,
    category: c.category
  })).sort((a, b) => b.revenue - a.revenue);
  
  return { data, status: 200 };
};

const mockAdminCreatorAnalytics: AdminCreatorAnalytics[] = [
  { id: 'creator-1', name: 'The Market Maven', username: 'marketmaven', avatar: 'https://picsum.photos/seed/maven/200/200', contentCount: 42, followers: 15400, engagementRate: 5.8, totalViews: 850000, totalRevenue: 12450.00, lastActive: '2024-03-12T10:30:00Z', verified: true, category: 'Economics' },
  { id: 'creator-4', name: 'Eleanor Vance', username: 'econvance', avatar: 'https://picsum.photos/seed/eleanor/200/200', contentCount: 120, followers: 25000, engagementRate: 4.2, totalViews: 4500000, totalRevenue: 28900.00, lastActive: '2024-03-12T11:45:00Z', verified: true, category: 'Economics' },
  { id: 'creator-2', name: 'Julian Wealth', username: 'wealthbuilder', avatar: 'https://picsum.photos/seed/wealth/200/200', contentCount: 15, followers: 8200, engagementRate: 6.4, totalViews: 120000, totalRevenue: 8500.50, lastActive: '2024-03-11T16:20:00Z', verified: true, category: 'Investing' },
  { id: 'creator-3', name: 'Sarah Crypto', username: 'defianalyst', avatar: 'https://picsum.photos/seed/defi/200/200', contentCount: 8, followers: 3500, engagementRate: 3.9, totalViews: 45000, totalRevenue: 1200.00, lastActive: '2024-03-10T09:15:00Z', verified: false, category: 'Crypto' },
  { id: 'creator-8', name: 'Dan Income', username: 'dividenddan', avatar: 'https://picsum.photos/seed/dan/200/200', contentCount: 35, followers: 12500, engagementRate: 7.1, totalViews: 420000, totalRevenue: 15600.00, lastActive: '2024-03-12T08:00:00Z', verified: true, category: 'Investing' },
];
