import { ApiResponse } from '@/types';

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
