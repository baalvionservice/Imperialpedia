import { ApiResponse } from '@/types';
import { TrafficAnalytics, SeoAnalytics, PlatformOverview, TrafficAnalyticsReport, ContentAnalytics, EngagementAnalytics, ModerationAnalytics } from '@/types/analytics';

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
