import { ApiResponse } from '@/types';
import { TrafficAnalytics, SeoAnalytics, PlatformOverview, SeoPerformanceItem } from '@/types/analytics';

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

export interface ContentMetrics {
  articleId: string;
  title: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  shares: number;
  avgReadTime: number; // in seconds
  seoScore: number;
}

export interface ContentAnalytics {
  totalViews: number;
  totalArticles: number;
  avgEngagement: number;
  topArticles: ContentMetrics[];
  topCategories: { category: string; views: number; articleCount: number }[];
  topTags: { tag: string; views: number }[];
  dailyViews: { date: string; views: number }[];
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
        },
        {
          articleId: 'art-4',
          title: 'DeFi Liquidity Pools Explained',
          category: 'Crypto',
          tags: ['DeFi', 'Liquidity'],
          views: 28400,
          likes: 720,
          comments: 145,
          shares: 85,
          avgReadTime: 510,
          seoScore: 88
        }
      ],
      topCategories: [
        { category: 'Economics', views: 450000, articleCount: 320 },
        { category: 'Investing', views: 380000, articleCount: 450 },
        { category: 'Markets', views: 220000, articleCount: 280 },
        { category: 'Crypto', views: 150000, articleCount: 120 },
        { category: 'Personal Finance', views: 54000, articleCount: 78 }
      ],
      topTags: [
        { tag: 'Macro', views: 120000 },
        { tag: 'Recession', views: 95000 },
        { tag: 'Wealth', views: 82000 },
        { tag: 'Dividends', views: 45000 }
      ],
      dailyViews: [
        { date: '2024-03-01', views: 42000 },
        { date: '2024-03-02', views: 45000 },
        { date: '2024-03-03', views: 38000 },
        { date: '2024-03-04', views: 52000 },
        { date: '2024-03-05', views: 61000 },
        { date: '2024-03-06', views: 58000 },
        { date: '2024-03-07', views: 65000 }
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
      sessionDuration: 402, // 6m 42s
      bounceRate: 32.4,
      deviceBreakdown: {
        desktop: 58,
        mobile: 35,
        tablet: 7
      },
      geoBreakdown: [
        { country: 'United States', users: 125000, percentage: 42 },
        { country: 'United Kingdom', users: 45000, percentage: 15 },
        { country: 'Germany', users: 32000, percentage: 11 },
        { country: 'Singapore', users: 24000, percentage: 8 },
        { country: 'Canada', users: 18000, percentage: 6 }
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
        { id: '3', page: '/articles/macro-economics', keyword: 'Macro Economics Trends', rank: 4.8, clicks: 5100, impressions: 28000, ctr: 18.2, trend: 'stable' },
        { id: '4', page: '/articles/inflation-impact', keyword: 'Inflation Impact', rank: 3.1, clicks: 4800, impressions: 15000, ctr: 32.0, trend: 'up' },
        { id: '5', page: '/articles/retirement-strategy', keyword: 'Retirement Savings Strategy', rank: 8.5, clicks: 2400, impressions: 12000, ctr: 20.0, trend: 'down' },
      ],
      trends: [
        { date: '2024-03-01', clicks: 4200, impressions: 120000 },
        { date: '2024-03-02', clicks: 4500, impressions: 125000 },
        { date: '2024-03-03', clicks: 3800, impressions: 110000 },
        { date: '2024-03-04', clicks: 5200, impressions: 140000 },
        { date: '2024-03-05', clicks: 6100, impressions: 165000 },
        { date: '2024-03-06', clicks: 5800, impressions: 155000 },
        { date: '2024-03-07', clicks: 6500, impressions: 180000 },
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
        { id: '3', title: 'DeFi Liquidity Pools', author: 'Sarah Crypto', views: 28400, engagement: 6.8, status: 'Stable' },
        { id: '4', title: 'Macro Trends in 2026', author: 'Eleanor Vance', views: 22100, engagement: 9.2, status: 'Growing' },
      ]
    },
    status: 200
  };
};
