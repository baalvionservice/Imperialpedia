import { CreatorProfile, ApiResponse, CreatorContentItem, CreatorDashboardSummary, CreatorDashboardAnalytics, CreatorVerification, CreatorLeaderboard, ScheduledContent, CreatorSettings, CreatorDashboardStats, Follower, CreatorRevenue, CreatorRevenueSummary, AdminCreatorAnalytics } from '@/types';
import { TopCreator } from '@/types/analytics';
import { Notification } from '@/modules/content-engine/types/article';

/**
 * @fileOverview Mock service for managing creator profiles, stats, and discovery data.
 * Expanded with Prompt 59 requirements for specific experts and detailed fields.
 */

const mockCreators: CreatorProfile[] = [
  {
    id: 'creator-sarah',
    username: 'smitchell',
    displayName: 'Sarah Mitchell',
    title: 'Market Strategist',
    bio: 'Specializing in macro-economic cycles and global interest rate arbitrage. Over 15 years of institutional research experience at leading investment banks.',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    joinedDate: '2023-01-15T00:00:00Z',
    specialties: ['Macroeconomics', 'Market Analysis', 'Bonds'],
    category: 'Economics',
    region: 'North America',
    verified: true,
    yearsExperience: 15,
    education: 'Wharton MBA, CFA',
    badges: ['Verified Analyst', 'Top Contributor', 'Market Strategist'],
    stats: {
      followersCount: 12800,
      followingCount: 142,
      articlesCount: 42,
      totalViews: 850000,
      totalReads: 452000,
      engagementScore: 94
    },
    content: {
      recentArticles: [
        { id: 'art-1', title: 'Understanding Market Cycles', slug: 'understanding-market-cycles', category: 'Market Analysis', publishedAt: '2024-03-01T10:00:00Z', reads: 45200, likes: 3200 },
        { id: 'art-7', title: 'The Future of Central Banking', slug: 'future-of-central-banking', category: 'Economics', publishedAt: '2024-03-12T08:00:00Z', reads: 12400, likes: 850 },
      ],
    },
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/smitchell' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/smitchell' }
    ],
  },
  {
    id: 'creator-david',
    username: 'dchen',
    displayName: 'David Chen',
    title: 'Crypto Analyst',
    bio: 'Blockchain researcher and protocol architect. Focused on decentralized liquidity nodes and the transition to algorithmic fiscal policy.',
    avatar: 'https://picsum.photos/seed/david/200/200',
    joinedDate: '2023-05-20T00:00:00Z',
    specialties: ['Cryptocurrency', 'Blockchain', 'DeFi'],
    category: 'Crypto',
    region: 'APAC',
    verified: true,
    yearsExperience: 8,
    education: 'Stanford Computer Science, M.S.',
    badges: ['Crypto Specialist', 'Verified Analyst'],
    stats: {
      followersCount: 9500,
      followingCount: 210,
      articlesCount: 28,
      totalViews: 120000,
      totalReads: 381000,
      engagementScore: 88
    },
    content: {
      recentArticles: [
        { id: 'art-4', title: 'Bitcoin Halving Explained', slug: 'bitcoin-halving-explained', category: 'Crypto Education', publishedAt: '2024-03-08T11:00:00Z', reads: 38100, likes: 2800 },
      ],
    },
    socialLinks: [
      { platform: 'Twitter', url: '#' },
      { platform: 'Github', url: '#' }
    ],
  },
  {
    id: 'creator-1',
    username: 'marketmaven',
    displayName: 'The Market Maven',
    title: 'Macro Analyst',
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
      ],
    },
    socialLinks: [
      { platform: 'Twitter', url: '#' }
    ],
  },
  {
    id: 'creator-4',
    username: 'econvance',
    displayName: 'Eleanor Vance',
    title: 'Lead Administrator',
    bio: 'Lead Administrator and Content Strategist at Imperialpedia. Focused on platform growth, pSEO integrity, and institutional research.',
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
];

const mockAdminCreatorAnalytics: AdminCreatorAnalytics[] = mockCreators.map(c => ({
  id: c.id,
  name: c.displayName,
  username: c.username,
  avatar: c.avatar,
  contentCount: c.stats.articlesCount,
  followers: c.stats.followersCount,
  engagementRate: c.stats.engagementScore || 5.0,
  totalViews: c.stats.totalViews,
  totalRevenue: 12450.00,
  lastActive: '2024-03-12T10:30:00Z',
  verified: c.verified,
  category: c.category
}));

export const getAdminCreatorAnalytics = async (): Promise<ApiResponse<AdminCreatorAnalytics[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: mockAdminCreatorAnalytics,
    status: 200,
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

const mockLeaderboard: CreatorLeaderboard[] = mockCreators.map(c => ({
  creatorId: c.id,
  name: c.displayName,
  profileImage: c.avatar,
  category: c.category,
  region: c.region,
  verified: c.verified,
  totalRevenue: 15400.50,
  totalViews: c.stats.totalViews,
  totalLikes: 12400
}));

const mockFollowers: Follower[] = [
  { id: 'f-1', name: 'Julian Wealth', username: 'wealthbuilder', profileImage: 'https://picsum.photos/seed/wealth/200/200', followedAt: '2024-03-01T10:00:00Z', status: 'following', category: 'Investing' },
  { id: 'f-2', name: 'Sarah Crypto', username: 'defianalyst', profileImage: 'https://picsum.photos/seed/defi/200/200', followedAt: '2024-03-05T14:30:00Z', status: 'not_following', category: 'Crypto' },
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
      totalFollowers: 25000,
      totalContent: 120,
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
    } as any,
    status: 200
  };
};

export const getCreatorContent = async (creatorId: string): Promise<ApiResponse<CreatorContentItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  const creator = mockCreators.find(c => c.id === creatorId || c.username === creatorId);
  const articles = creator?.content.recentArticles || [];

  const extendedContent: CreatorContentItem[] = articles.map(a => ({
    id: a.id,
    title: a.title,
    snippet: 'Strategic overview of current market dynamics and node transitions.',
    body: 'Full analysis text content...',
    category: a.category,
    tags: ['Macro', 'Alpha'],
    status: 'published',
    createdAt: a.publishedAt,
    views: a.reads || 1200,
    likes: a.likes || 100,
    comments: 42,
    reads: a.reads || 1200,
    slug: a.slug
  }));

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
        { contentId: 'c-1', title: 'Quantitative Easing vs Tightening: A 2026 Outlook', views: 45000, likes: 1200, comments: 240, shares: 350, revenue: 448.20, createdAt: '2024-03-01T10:00:00Z' },
      ],
      dailyMetrics: [
        { date: '2024-03-01', views: 12000, revenue: 119.50, engagement: 450, followers: 12 },
        { date: '2024-03-02', views: 15400, revenue: 153.20, engagement: 580, followers: 24 },
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

export const getFollowers = async (creatorId: string): Promise<ApiResponse<Follower[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockFollowers,
    status: 200
  };
};

export const getFollowing = async (creatorId: string): Promise<ApiResponse<Follower[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: [...mockFollowers].reverse(),
    status: 200
  };
};

export const getCreatorVerificationStatus = async (creatorId: string): Promise<ApiResponse<CreatorVerification>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  if (creatorId === 'u-1' || creatorId === 'creator-4') {
    return {
      data: {
        creatorId,
        creatorName: 'Eleanor Vance',
        creatorAvatar: 'https://picsum.photos/seed/eleanor/200/200',
        verified: true,
        status: 'verified',
        requestedAt: '2023-12-01T10:00:00Z',
        approvedAt: '2023-12-05T14:30:00Z',
        documentsProvided: ['LinkedIn Profile', 'FINRA Certification']
      },
      status: 200
    };
  }

  return {
    data: {
      creatorId,
      creatorName: 'Standard User',
      creatorAvatar: '',
      verified: false,
      status: 'unverified',
      documentsProvided: []
    },
    status: 200
  };
};

export const getCreatorRevenue = async (creatorId: string): Promise<ApiResponse<CreatorRevenueSummary>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      totalRevenue: 28900.00,
      availableBalance: 12450.75,
      pendingPayout: 3200.00,
      lastPayoutDate: '2024-03-01T10:00:00Z',
      topEarningContent: [
        { contentId: 'c-1', title: 'Quantitative Easing vs Tightening: A 2026 Outlook', revenue: 448.20 },
      ],
      revenueTrends: [
        { date: '2024-03-01', amount: 119.50 },
      ]
    },
    status: 200
  };
};

export const getPayoutHistory = async (creatorId: string): Promise<ApiResponse<CreatorRevenue[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: [
      { contentId: 'c-1', title: 'Quantitative Easing vs Tightening: A 2026 Outlook', revenue: 124.50, dateEarned: '2024-03-07T10:00:00Z' },
    ],
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
];
