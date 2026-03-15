import { CreatorProfile, ApiResponse, CreatorContentItem, CreatorDashboardSummary } from '@/types';

/**
 * @fileOverview Mock service for managing creator profiles, stats, and dashboard content.
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
  },
  {
    id: 'creator-4',
    username: 'econvance',
    displayName: 'Eleanor Vance',
    bio: 'Lead Administrator and Content Strategist at Imperialpedia. Focused on platform growth and pSEO integrity.',
    avatar: 'https://picsum.photos/seed/eleanor/200/200',
    joinedDate: '2022-12-01T00:00:00Z',
    specialties: ['Economics', 'Growth', 'Strategy'],
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
  }
];

const mockCreatorDashboardContent: CreatorContentItem[] = [
  {
    id: 'c-1',
    title: 'Quantitative Easing vs Tightening: A 2026 Outlook',
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

export const getCreatorDashboardStats = async (creatorId: string): Promise<ApiResponse<CreatorDashboardSummary>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      totalArticles: 120,
      totalFollowers: 25000,
      totalViews: 4500000,
      engagementRate: 4.8
    },
    status: 200
  };
};

export const getCreatorContent = async (creatorId: string): Promise<ApiResponse<CreatorContentItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockCreatorDashboardContent,
    status: 200
  };
};
