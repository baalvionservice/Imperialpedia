import { ApiResponse } from '@/types';
import { CommunityData, Comment, Poll } from '@/types/community';

/**
 * @fileOverview Mock service for the Community and Engagement engine.
 */

const mockComments: Comment[] = [
  {
    id: 'c-1',
    username: 'MarketWatchdog',
    reputationScore: 1240,
    badge: 'Elite Analyst',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    timestamp: '2024-03-12T10:30:00Z',
    content: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction. This analysis perfectly captures the liquidity risk.',
    upvotes: 42,
    downvotes: 3,
    bullBearVote: 'Bear',
    replies: [
      {
        id: 'c-1-1',
        username: 'Julian Wealth',
        reputationScore: 8500,
        badge: 'Verified Expert',
        avatar: 'https://picsum.photos/seed/wealth/200/200',
        timestamp: '2024-03-12T11:15:00Z',
        content: 'Correct, but we should also consider the high consumer cash reserves which might act as a buffer this cycle.',
        upvotes: 12,
        downvotes: 1,
        bullBearVote: 'Neutral',
      }
    ]
  },
  {
    id: 'c-2',
    username: 'AlphaHunter',
    reputationScore: 420,
    timestamp: '2024-03-12T09:45:00Z',
    content: 'Buying the dip here. Sentiment is too pessimistic.',
    upvotes: 15,
    downvotes: 8,
    bullBearVote: 'Bull',
  }
];

const mockPolls: Poll[] = [
  {
    id: 'p-1',
    question: 'Will the Fed cut rates in Q2?',
    options: ['Yes, 25bps+', 'No, status quo', 'Higher rates expected'],
    votes: [45, 30, 25],
    totalVotes: 1240,
    expiresAt: '2024-03-20T00:00:00Z'
  }
];

const mockTrending: string[] = [
  'Yield Curve Inversion 2026',
  'DeFi Liquidity Crisis?',
  'Gold vs Bitcoin as Store of Value',
  'Federal Reserve Q2 Predictions'
];

export const getCommunityData = async (): Promise<ApiResponse<CommunityData>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      comments: mockComments,
      polls: mockPolls,
      trendingDiscussions: mockTrending
    },
    status: 200,
  };
};
