import { CreatorProfile, ApiResponse, CreatorContentItem, CreatorDashboardSummary, CreatorDashboardAnalytics, CreatorVerification, CreatorLeaderboard, ScheduledContent, CreatorSettings, CreatorDashboardStats } from '@/types';
import { Notification } from '@/modules/content-engine/types/article';

/**
 * @fileOverview Mock service for managing creator profiles, stats, and discovery data.
 */

const mockCreators: CreatorProfile[] = [
  {
    id: 'creator-1',
    username: 'marketmaven',
    displayName: 'The Market Maven',
    bio: 'Expert in macro-economic trends and fixed income markets. Former hedge fund analyst focused on interest rate policy.',
    avatar: 'https://picsum.photos/seed/maven/200/200',
    joinedDate: '2023-01-15T00:00:00Z',
    specialties: ['Economics', 'Bonds', 'Macro'],
    category: 'Economics',
    region: 'North America',
    verified: true,
    stats: {
      followersCount: 15400,
      followingCount: 142,
      articlesCount: 42,
      totalViews: 850000,
    },
    content: {
      recentArticles: [
        { id: 'art-1', title: 'Understanding Yield Curve Inversion', slug: 'understanding-yield-curve-inversion', category: 'Economics', publishedAt: '2024-03-01T00:00:00Z' },
        { id: 'art-sub-1', title: 'The Future of Central Banking', slug: 'future-of-central-banking', category: 'Economics', publishedAt: '2024-03-09T00:00:00Z' },
      ],
    },
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/marketmaven' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/marketmaven' },
      { platform: 'Website', url: 'https://marketmaven.com' }
    ],
  },
  {
    id: 'creator-2',
    username: 'wealthbuilder',
    displayName: 'Julian Wealth',
    bio: 'Strategic wealth manager specializing in ESG and sustainable long-term portfolios.',
    avatar: 'https://picsum.photos/seed/wealth/200/200',
    joinedDate: '2023-05-20T00:00:00Z',
    specialties: ['Wealth Management', 'ESG', 'Strategy'],
    category: 'Investing',
    region: 'EMEA',
    verified: true,
    stats: {
      followersCount: 8200,
      followingCount: 210,
      articlesCount: 15,
      totalViews: 120000,
    },
    content: {
      recentArticles: [],
    },
    socialLinks: [
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Twitter', url: '#' }
    ],
  },
  {
    id: 'creator-3',
    username: 'defianalyst',
    displayName: 'Sarah Crypto',
    bio: 'DeFi researcher and smart contract security expert. Helping investors navigate the yield farm landscape.',
    avatar: 'https://picsum.photos/seed/defi/200/200',
    joinedDate: '2024-01-10T00:00:00Z',
    specialties: ['DeFi', 'Web3', 'Ethereum'],
    category: 'Crypto',
    region: 'APAC',
    verified: false,
    stats: {
      followersCount: 3500,
      followingCount: 85,
      articlesCount: 8,
      totalViews: 45000,
    },
    content: {
      recentArticles: [],
    },
    socialLinks: [
      { platform: 'Twitter', url: '#' },
      { platform: 'Github', url: '#' }
    ],
  },
  {
    id: 'creator-4',
    username: 'econvance',
    displayName: 'Eleanor Vance',
    bio: 'Lead Administrator and Content Strategist at Imperialpedia. Focused on platform growth and pSEO integrity.',
    avatar: 'https://picsum.photos/seed/eleanor/200/200',
    joinedDate: '2022-12-01T00:00:00Z',
    specialties: ['Economics', 'Growth', 'Strategy'],
    category: 'Economics',
    region: 'North America',
    verified: true,
    stats: {
      followersCount: 25000,
      followingCount: 500,
      articlesCount: 120,
      totalViews: 4500000,
    },
    content: {
      recentArticles: [],
    },
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/eleanorvance' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/eleanorvance' }
    ],
  },
  {
    id: 'creator-5',
    username: 'macroken',
    displayName: 'Ken Macro',
    bio: 'Global macro analyst with 20 years experience in treasury markets and gold cycles.',
    avatar: 'https://picsum.photos/seed/ken/200/200',
    joinedDate: '2023-02-15T00:00:00Z',
    specialties: ['Gold', 'Macro', 'Treasuries'],
    category: 'Markets',
    region: 'North America',
    verified: false,
    stats: {
      followersCount: 1200,
      followingCount: 45,
      articlesCount: 5,
      totalViews: 12000,
    },
    content: {
      recentArticles: [],
    },
    socialLinks: [
      { platform: 'Twitter', url: '#' }
    ],
  }
];

const mockLeaderboard: CreatorLeaderboard[] = [
  { creatorId: 'creator-1', name: 'The Market Maven', profileImage: 'https://picsum.photos/seed/maven/200/200', category: 'Economics', region: 'North America', verified: true, totalRevenue: 15400.50, totalViews: 850000, totalLikes: 12400 },
  { creatorId: 'creator-4', name: 'Eleanor Vance', profileImage: 'https://picsum.photos/seed/eleanor/200/200', category: 'Economics', region: 'North America', verified: true, totalRevenue: 28900.00, totalViews: 4500000, totalLikes: 42000 },
  { creatorId: 'creator-2', name: 'Julian Wealth', profileImage: 'https://picsum.photos/seed/wealth/200/200', category: 'Investing', region: 'EMEA', verified: true, totalRevenue: 12200.75, totalViews: 120000, totalLikes: 5600 },
  { creatorId: 'creator-3', name: 'Sarah Crypto', profileImage: 'https://picsum.photos/seed/defi/200/200', category: 'Crypto', region: 'APAC', verified: false, totalRevenue: 4500.20, totalViews: 45000, totalLikes: 2100 },
  { creatorId: 'creator-5', name: 'Ken Macro', profileImage: 'https://picsum.photos/seed/ken/200/200', category: 'Markets', region: 'North America', verified: false, totalRevenue: 2100.00, totalViews: 12000, totalLikes: 850 },
  { creatorId: 'u-7', name: 'Bull Analyst', profileImage: 'https://picsum.photos/seed/bull/200/200', category: 'Markets', region: 'North America', verified: true, totalRevenue: 9800.40, totalViews: 95000, totalLikes: 4300 },
  { creatorId: 'u-8', name: 'ESG Expert', profileImage: 'https://picsum.photos/seed/esg/200/200', category: 'Investing', region: 'EMEA', verified: false, totalRevenue: 3400.10, totalViews: 32000, totalLikes: 1500 },
];

export const getCreators = async (): Promise<ApiResponse<CreatorProfile[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockCreators,
    status: 200,
  };
};

export const getCreatorById = async (id: string): Promise<ApiResponse<CreatorProfile | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const creator = mockCreators.find((c) => c.id === id || c.username === id) || null;
  return {
    data: creator,
    status: creator ? 200 : 404,
  };
};

export const getCreatorDashboardStats = async (creatorId: string): Promise<ApiResponse<CreatorDashboardStats>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      creatorId,
      totalArticles: 120,
      totalFollowers: 25000,
      totalViews: 4500000,
      totalLikes: 42000,
      totalComments: 8400,
      totalRevenue: 28900.00,
      performanceTrends: [
        { date: '2024-03-01', reach: 45000, engagement: 1200 },
        { date: '2024-03-02', reach: 52000, engagement: 1500 },
        { date: '2024-03-03', reach: 48000, engagement: 1100 },
        { date: '2024-03-04', reach: 61000, engagement: 1800 },
        { date: '2024-03-05', reach: 75000, engagement: 2200 },
        { date: '2024-03-06', reach: 68000, engagement: 1900 },
        { date: '2024-03-07', reach: 82000, engagement: 2500 },
      ]
    } as any, // casting to bypass partial matches
    status: 200
  };
};

export const getCreatorContent = async (creatorId: string): Promise<ApiResponse<CreatorContentItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  // Generate a larger set for pagination testing
  const extendedContent: CreatorContentItem[] = [
    ...mockCreatorDashboardContent,
    {
      id: 'c-4',
      title: 'Monetary Policy in the 2030s',
      snippet: 'Predicting the shift from quantitative easing to structural digital currency adoption.',
      body: 'Long analysis...',
      category: 'Economics',
      tags: ['Future', 'Central Banks'],
      status: 'published',
      createdAt: '2024-02-15T10:00:00Z',
      views: 8500,
      likes: 230,
      comments: 45,
      slug: 'monetary-policy-2030s'
    },
    {
      id: 'c-5',
      title: 'Fixed Income Strategies for High Inflation',
      snippet: 'How to protect your portfolio as purchasing power erodes.',
      body: 'Long analysis...',
      category: 'Investing',
      tags: ['Bonds', 'Inflation'],
      status: 'published',
      createdAt: '2024-01-20T10:00:00Z',
      views: 15200,
      likes: 540,
      comments: 92,
      slug: 'fixed-income-inflation'
    },
    {
      id: 'c-6',
      title: 'The Great Wealth Transfer',
      snippet: 'Analyzing the multi-trillion dollar shift in generational assets.',
      body: 'Long analysis...',
      category: 'Investing',
      tags: ['Wealth', 'Demographics'],
      status: 'published',
      createdAt: '2023-12-05T10:00:00Z',
      views: 24500,
      likes: 1100,
      comments: 210,
      slug: 'great-wealth-transfer'
    }
  ];
  return {
    data: extendedContent,
    status: 200
  };
};

export const getCreatorAnalytics = async (creatorId: string): Promise<ApiResponse<CreatorDashboardAnalytics>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: {
      totalRevenue: 12450.75,
      totalViews: 1250000,
      totalEngagement: 45800,
      avgRpm: 9.96,
      topContent: [
        { contentId: 'c-1', title: 'Quantitative Easing vs Tightening: A 2026 Outlook', views: 45000, likes: 1200, comments: 240, shares: 350, revenue: 448.20 },
        { contentId: 'c-2', title: 'The Future of Central Banking', views: 32000, likes: 850, comments: 120, shares: 180, revenue: 318.75 },
        { contentId: 'c-3', title: 'Yield Curve Inversion Deep Dive', views: 28000, likes: 1100, comments: 310, shares: 420, revenue: 278.90 },
        { contentId: 'c-4', title: 'DeFi Liquidity Pools Explained', views: 22000, likes: 640, comments: 95, shares: 110, revenue: 219.10 }
      ],
      dailyMetrics: [
        { date: '2024-03-01', views: 12000, revenue: 119.50, engagement: 450 },
        { date: '2024-03-02', views: 15400, revenue: 153.20, engagement: 580 },
        { date: '2024-03-03', views: 11200, revenue: 111.40, engagement: 410 },
        { date: '2024-03-04', views: 18900, revenue: 188.10, engagement: 720 },
        { date: '2024-03-05', views: 22100, revenue: 220.30, engagement: 840 },
        { date: '2024-03-06', views: 20500, revenue: 204.20, engagement: 790 },
        { date: '2024-03-07', views: 25400, revenue: 252.80, engagement: 960 }
      ]
    },
    status: 200
  };
};

export const getPendingVerifications = async (): Promise<ApiResponse<CreatorVerification[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockPendingVerifications,
    status: 200
  };
};

export const getLeaderboardData = async (): Promise<ApiResponse<CreatorLeaderboard[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockLeaderboard,
    status: 200
  };
};

export const getCreatorNotifications = async (creatorId: string): Promise<ApiResponse<Notification[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockNotifications,
    status: 200
  };
};

export const getScheduledContent = async (creatorId: string): Promise<ApiResponse<ScheduledContent[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockScheduledContent,
    status: 200
  };
};

export const getCreatorSettings = async (creatorId: string): Promise<ApiResponse<CreatorSettings>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockCreatorSettings,
    status: 200
  };
};

const mockCreatorSettings: CreatorSettings = {
  creatorId: 'u-1',
  name: 'Eleanor Vance',
  displayName: 'Eleanor Vance',
  bio: 'Lead Administrator and Content Strategist at Imperialpedia. Focused on platform growth and pSEO integrity.',
  profileImage: 'https://picsum.photos/seed/eleanor/200/200',
  email: 'eleanor@imperialpedia.com',
  notifications: {
    engagement: true,
    followers: true,
    announcements: false
  },
  categories: ['Economics', 'Growth', 'Strategy'],
  socialLinks: [
    { platform: 'Twitter', url: 'https://twitter.com/eleanorvance' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/eleanorvance' }
  ]
};

const mockScheduledContent: ScheduledContent[] = [
  { id: 'sc-1', title: 'Macro Trends in 2026', scheduledAt: '2024-04-10T10:00:00Z', status: 'scheduled', category: 'Economics', tags: ['Macro', 'Future'] },
  { id: 'sc-2', title: 'Quantitative Easing vs Tightening', scheduledAt: '2024-04-12T14:30:00Z', status: 'scheduled', category: 'Markets', tags: ['Bonds', 'Fed'] },
  { id: 'sc-3', title: 'The Future of DeFi', scheduledAt: '2024-04-15T09:00:00Z', status: 'scheduled', category: 'Crypto', tags: ['Web3', 'Ethereum'] },
  { id: 'sc-4', title: 'Passive Income Strategies', scheduledAt: '', status: 'draft', category: 'Investing', tags: ['Wealth', 'Dividends'] },
];

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'u-1',
    type: 'follower',
    message: 'Ken Macro started following your expert profile.',
    createdAt: new Date().toISOString(),
    read: false,
    relatedId: 'creator-5'
  },
  {
    id: 'notif-2',
    userId: 'u-1',
    type: 'engagement',
    message: 'Your article "Monetary Policy in the 2030s" received 12 new comments.',
    createdAt: new Date(Date.now() - 3600000).toISOString(), read: false, relatedId: 'c-4'
  },
  {
    id: 'notif-3',
    userId: 'u-1',
    type: 'announcement',
    message: 'Platform Update: New Imagen 4 content tools are now available for verified experts.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    read: true
  },
  {
    id: 'notif-4',
    userId: 'u-1',
    type: 'success',
    message: 'Verification complete! You are now a recognized Imperialpedia Expert.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    read: true
  }
];

const mockCreatorDashboardContent: CreatorContentItem[] = [
  {
    id: 'c-1',
    title: 'Quantitative Easing vs Tightening: A 2026 Outlook',
    snippet: 'Mastering the nuances of central bank liquidity cycles in the next decade.',
    body: 'Full analysis text content...',
    category: 'Economics',
    tags: ['Macro', 'Fed'],
    status: 'published',
    createdAt: '2024-03-01T10:00:00Z',
    views: 12400,
    likes: 450,
    comments: 82,
    slug: 'qe-vs-qt-2026'
  },
  {
    id: 'c-2',
    title: 'The Rise of Algorithmic Stablecoins',
    snippet: 'Evaluating the stability and risks of decentralized dollar pegs.',
    body: 'In-progress research...',
    category: 'Crypto',
    tags: ['DeFi', 'Stablecoins'],
    status: 'draft',
    createdAt: '2024-03-10T14:30:00Z',
    views: 0,
    likes: 0,
    comments: 0,
    slug: 'algorithmic-stablecoins'
  },
  {
    id: 'c-3',
    title: 'Yield Curve Dynamics in Emerging Markets',
    snippet: 'Understanding global risk-off signals from secondary debt markets.',
    body: 'Scheduled content text...',
    category: 'Markets',
    tags: ['Emerging Markets', 'Yield Curve'],
    status: 'scheduled',
    createdAt: '2024-03-05T09:00:00Z',
    views: 0,
    likes: 0,
    comments: 0,
    slug: 'yield-curve-emerging-markets'
  }
];

const mockPendingVerifications: CreatorVerification[] = [
  {
    creatorId: 'u-4',
    creatorName: 'Wealth Builder',
    creatorAvatar: 'https://picsum.photos/seed/wealth/200/200',
    verified: false,
    requestedAt: '2024-03-10T10:00:00Z',
    status: 'pending',
    documentsProvided: ['LinkedIn Profile', 'FINRA Certification']
  },
  {
    creatorId: 'u-6',
    creatorName: 'DeFi Analyst',
    creatorAvatar: 'https://picsum.photos/seed/defi/200/200',
    verified: false,
    requestedAt: '2024-03-11T14:20:00Z',
    status: 'pending',
    documentsProvided: ['Whitepaper Authorship', 'Github Repository']
  }
];
