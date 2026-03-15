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

export interface ContentMetrics {
  articleId: string;
  title: string;
  category: string;
  tags: string[];
  views: number;
  clicks: number;
  shares: number;
  seoScore: number;
}

export interface ContentAnalytics {
  totalViews: number;
  totalArticles: number;
  avgEngagement: number;
  topArticles: ContentMetrics[];
  topCategories: { category: string; views: number }[];
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

export const getContentAnalytics = async (): Promise<ApiResponse<ContentAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      totalViews: 1254000,
      totalArticles: 1248,
      avgEngagement: 4.2,
      topArticles: [
        {
          articleId: 'art-1',
          title: 'Understanding Yield Curve Inversion',
          category: 'Economics',
          tags: ['Macro', 'Recession'],
          views: 45200,
          clicks: 12400,
          shares: 1200,
          seoScore: 98
        },
        {
          articleId: 'art-2',
          title: 'The Power of Compound Interest',
          category: 'Investing',
          tags: ['Basics', 'Wealth'],
          views: 38900,
          clicks: 9800,
          shares: 2400,
          seoScore: 95
        },
        {
          articleId: 'art-3',
          title: 'Macro Trends in 2026',
          category: 'Economics',
          tags: ['Macro', 'Future'],
          views: 31200,
          clicks: 8500,
          shares: 900,
          seoScore: 92
        },
        {
          articleId: 'art-4',
          title: 'DeFi Liquidity Pools Explained',
          category: 'Crypto',
          tags: ['DeFi', 'Liquidity'],
          views: 28400,
          clicks: 7200,
          shares: 400,
          seoScore: 88
        }
      ],
      topCategories: [
        { category: 'Economics', views: 450000 },
        { category: 'Investing', views: 380000 },
        { category: 'Markets', views: 220000 },
        { category: 'Crypto', views: 150000 },
        { category: 'Personal Finance', views: 54000 }
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
