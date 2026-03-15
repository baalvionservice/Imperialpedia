import { ApiResponse } from '@/types';
import { CommunityData, Comment, Poll, UserReputation, LeaderboardEntry, CommunityBadge, PredictionContest } from '@/types/community';

/**
 * @fileOverview Mock service for the Community and Engagement engine.
 * Refined for Prompt 37 requirements.
 */

const mockComments: Comment[] = [
  {
    id: 'c-1',
    comment_id: 1,
    username: 'MarketWatchdog',
    reputation: 1240,
    reputationScore: 1240,
    badge: 'Elite Analyst',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    timestamp: '2026-03-15 10:00',
    content: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction. This analysis perfectly captures the liquidity risk.',
    text: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction. This analysis perfectly captures the liquidity risk.',
    upvotes: 42,
    downvotes: 3,
    bullBearVote: 'Bear',
    bull_bear: 'Bear',
    replies: [
      {
        id: 'c-1-1',
        comment_id: 2,
        parent_id: 1,
        username: 'Julian Wealth',
        reputation: 8500,
        reputationScore: 8500,
        badge: 'Verified Expert',
        avatar: 'https://picsum.photos/seed/wealth/200/200',
        timestamp: '2026-03-15 10:05',
        content: 'Correct, but we should also consider the high consumer cash reserves which might act as a buffer this cycle.',
        text: 'Correct, but we should also consider the high consumer cash reserves which might act as a buffer this cycle.',
        upvotes: 12,
        downvotes: 1,
        bullBearVote: 'Neutral',
        bull_bear: 'Neutral',
      }
    ]
  },
  {
    id: 'c-2',
    comment_id: 3,
    username: 'AlphaHunter',
    reputation: 420,
    reputationScore: 420,
    avatar: 'https://picsum.photos/seed/alpha/200/200',
    timestamp: '2026-03-15 11:20',
    content: 'Buying the dip here. Sentiment is too pessimistic.',
    text: 'Buying the dip here. Sentiment is too pessimistic.',
    upvotes: 15,
    downvotes: 8,
    bullBearVote: 'Bull',
    bull_bear: 'Bull',
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  { username: 'MarketMaven', reputation: 1240, avatar: 'https://picsum.photos/seed/maven/200/200', badges: ['Verified Analyst'] },
  { username: 'WealthBuilder', reputation: 1100, avatar: 'https://picsum.photos/seed/wealth/200/200', badges: ['Expert Contributor'] },
  { username: 'AlphaHunter', reputation: 850, avatar: 'https://picsum.photos/seed/alpha/200/200', badges: ['Top Forecaster'] },
];

const mockPolls: Poll[] = [
  {
    id: 'p-1',
    question: 'Will the Fed cut rates in Q2?',
    options: ['Yes, 25bps+', 'No, status quo', 'Higher rates expected'],
    votes: [45, 30, 25],
    totalVotes: 1240,
    expiresAt: '2024-03-20T00:00:00Z',
    status: 'ongoing'
  }
];

const mockBadges: CommunityBadge[] = [
  { id: 'b-1', name: 'Expert Contributor', description: 'Published 10+ research nodes.', icon: 'Award', rarity: 'Expert' },
];

const mockUserReputation: UserReputation = {
  username: 'Deepak Kumar',
  reputationScore: 1200,
  level: 14,
  nextLevelProgress: 65,
  activityPoints: 450,
  badges: []
};

const mockPredictionContests: PredictionContest[] = [
  {
    id: 'cont-1',
    name: 'March Market Movers',
    description: 'Predict top performers.',
    assets: ['AAPL', 'NVDA'],
    status: 'ongoing',
    endsAt: '2024-03-22T00:00:00Z',
    participants: [],
    topParticipants: []
  }
];

export const getCommunityData = async (): Promise<ApiResponse<CommunityData>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      comments: mockComments,
      polls: mockPolls,
      trendingDiscussions: ['Yield Curve 2026', 'Fed Liquidity'],
      userReputation: mockUserReputation,
      leaderboard: mockLeaderboard,
      predictionContests: mockPredictionContests
    },
    status: 200,
  };
};
