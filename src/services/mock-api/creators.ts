import { CreatorProfile, ApiResponse } from '@/types';

/**
 * @fileOverview Mock service for managing creator profiles and stats.
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
    id: 'creator-2',
    username: 'wealthbuilder',
    displayName: 'Wealth Builder',
    bio: 'Specializing in long-term wealth accumulation and compound interest strategies for retail investors.',
    avatar: 'https://picsum.photos/seed/wealth/200/200',
    joinedDate: '2023-05-20T00:00:00Z',
    specialties: ['Investing', 'Personal Finance', 'Retirement'],
    verified: true,
    stats: {
      followersCount: 8200,
      followingCount: 89,
      articlesCount: 15,
      totalViews: 320000,
    },
    content: {
      recentArticles: [
        { id: 'art-2', title: 'The Power of Compound Interest', slug: 'the-power-of-compound-interest', category: 'Investing', publishedAt: '2024-02-15T00:00:00Z' },
      ],
    },
  },
  {
    id: 'creator-3',
    username: 'cryptovisor',
    displayName: 'Crypto Visor',
    bio: 'Deep-dive analysis into DeFi protocols, Web3 infrastructure, and algorithmic stablecoins.',
    avatar: 'https://picsum.photos/seed/crypto/200/200',
    joinedDate: '2023-11-10T00:00:00Z',
    specialties: ['Crypto', 'Web3', 'DeFi'],
    verified: false,
    stats: {
      followersCount: 3500,
      followingCount: 210,
      articlesCount: 8,
      totalViews: 120000,
    },
    content: {
      recentArticles: [],
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

export const getCreators = async (): Promise<ApiResponse<CreatorProfile[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockCreators,
    status: 200,
  };
};

export const getCreatorByUsername = async (username: string): Promise<ApiResponse<CreatorProfile | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const creator = mockCreators.find((c) => c.username === username || c.id === username) || null;
  return {
    data: creator,
    status: creator ? 200 : 404,
  };
};

export const getCreatorById = async (id: string): Promise<ApiResponse<CreatorProfile | null>> => {
  return getCreatorByUsername(id);
};
