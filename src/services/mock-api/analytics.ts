import { ApiResponse } from '@/types';
import { TrafficAnalytics, SeoAnalytics, PlatformOverview, TrafficAnalyticsReport, ContentAnalytics, EngagementAnalytics, ModerationAnalytics, CreatorEngagement, TrafficSources, TrendingContent, DailyActiveUsers, WeeklyActiveUsers, TopContent } from '@/types/analytics';

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

export const getContentAnalytics = async (): Promise<ApiResponse<ContentAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      totalViews: 1254000,
      totalArticles: 1248,
      avgEngagement: 4.8,
      topArticles: [
        {
          articleId: 'art-1',
          title: 'Understanding Yield Curve Inversion',
          category: 'Economics',
          tags: ['Macro', 'Recession'],
          views: 45200,
          likes: 1240,
          comments: 320,
          shares: 580,
          avgReadTime: 485,
          seoScore: 98
        },
        {
          articleId: 'art-2',
          title: 'The Power of Compound Interest',
          category: 'Investing',
          tags: ['Basics', 'Wealth'],
          views: 38900,
          likes: 2400,
          comments: 110,
          shares: 920,
          avgReadTime: 320,
          seoScore: 95
        },
        {
          articleId: 'art-3',
          title: 'Macro Trends in 2026',
          category: 'Economics',
          tags: ['Macro', 'Future'],
          views: 31200,
          likes: 850,
          comments: 95,
          shares: 210,
          avgReadTime: 640,
          seoScore: 92
        }
      ],
      topCategories: [
        { category: 'Economics', views: 450000, articleCount: 320 },
        { category: 'Investing', views: 380000, articleCount: 450 },
        { category: 'Markets', views: 220000, articleCount: 280 }
      ],
      topTags: [
        { tag: 'Macro', views: 120000 },
        { tag: 'Recession', views: 95000 }
      ],
      dailyViews: [
        { date: '2024-03-01', views: 42000 },
        { date: '2024-03-02', views: 45000 }
      ]
    },
    status: 200
  };
};

export const getTrafficAnalytics = async (): Promise<ApiResponse<TrafficAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      activeUsers: 1420,
      pageViews: 425000,
      sessionDuration: 402,
      bounceRate: 32.4,
      deviceBreakdown: { desktop: 58, mobile: 35, tablet: 7 },
      geoBreakdown: [
        { country: 'United States', users: 125000, percentage: 42 }
      ],
      hourlyTraffic: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        sessions: Math.floor(Math.random() * 500) + 200,
        views: Math.floor(Math.random() * 2000) + 1000
      }))
    },
    status: 200
  };
};

export const getTrafficAnalyticsReport = async (): Promise<ApiResponse<TrafficAnalyticsReport>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      dailyVisits: [
        { date: '2024-03-01', visits: 12400 },
        { date: '2024-03-02', visits: 13200 },
        { date: '2024-03-03', visits: 11800 },
        { date: '2024-03-04', visits: 14500 },
        { date: '2024-03-05', visits: 16200 },
        { date: '2024-03-06', visits: 15800 },
        { date: '2024-03-07', visits: 17400 },
      ],
      trafficSources: [
        { source: 'Organic Search', percent: 45 },
        { source: 'Direct', percent: 25 },
        { source: 'Social Media', percent: 18 },
        { source: 'Referral', percent: 12 },
      ],
      topPages: [
        { page: '/articles/yield-curve', visits: 45200, bounceRate: 24.5 },
        { page: '/financial-tools/compound-interest', visits: 38900, bounceRate: 18.2 },
        { page: '/glossary/bull-market', visits: 28400, bounceRate: 35.1 },
      ]
    },
    status: 200
  };
};

export const getTrafficSources = async (): Promise<ApiResponse<TrafficSources>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      sources: [
        { name: 'Organic Search', percent: 45.2, trend: 'Up', count: 56400 },
        { name: 'Direct', percent: 24.8, trend: 'Stable', count: 31000 },
        { name: 'Social Media', percent: 18.5, trend: 'Up', count: 23100 },
        { name: 'Referral', percent: 11.5, trend: 'Down', count: 14300 },
      ],
      topReferrers: [
        { source: 'google.com', visits: 42500, conversion: 4.2, trend: 'Up' },
        { source: 'twitter.com', visits: 15400, conversion: 6.8, trend: 'Up' },
        { source: 'linkedin.com', visits: 8200, conversion: 8.4, trend: 'Stable' },
        { source: 'bing.com', visits: 4100, conversion: 2.1, trend: 'Down' },
        { source: 'duckduckgo.com', visits: 2800, conversion: 3.5, trend: 'Up' },
      ]
    },
    status: 200
  };
};

export const getSeoAnalytics = async (): Promise<ApiResponse<SeoAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      indexedPages: 1042000,
      clickThroughRate: 4.2,
      avgPosition: 12.4,
      backlinks: 85400,
      topKeywords: [
        { id: '1', page: '/articles/yield-curve', keyword: 'Yield Curve Inversion', rank: 1.2, clicks: 12400, impressions: 45000, ctr: 27.5, trend: 'up' },
        { id: '2', page: '/financial-tools/compound-interest', keyword: 'Compound Interest Calculator', rank: 2.4, clicks: 8200, impressions: 32000, ctr: 25.6, trend: 'up' },
      ],
      trends: [
        { date: '2024-03-01', clicks: 4200, impressions: 120000 },
        { date: '2024-03-02', clicks: 4500, impressions: 125000 },
      ]
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
        { date: '2024-03-05', users: 141900 },
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
