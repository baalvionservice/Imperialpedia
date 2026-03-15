import { ApiResponse } from '@/types';
import { CommunityData, Comment, Poll, UserReputation, LeaderboardEntry, CommunityBadge, PredictionContest } from '@/types/community';

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
    expiresAt: '2024-03-20T00:00:00Z',
    status: 'ongoing'
  },
  {
    id: 'p-2',
    question: 'Which asset class is the best hedge for 2026?',
    options: ['Physical Gold', 'Bitcoin', 'Cash/Short-term T-bills', 'Real Estate'],
    votes: [320, 410, 150, 120],
    totalVotes: 1000,
    expiresAt: '2024-03-25T00:00:00Z',
    status: 'ongoing'
  }
];

const mockBadges: CommunityBadge[] = [
  { id: 'b-1', name: 'Expert Contributor', description: 'Published 10+ high-impact research nodes.', icon: 'Award', rarity: 'Expert' },
  { id: 'b-2', name: 'Verified Analyst', description: 'Credentials verified by the Compliance Hub.', icon: 'ShieldCheck', rarity: 'Legendary' },
  { id: 'b-3', name: 'AMA Host', description: 'Hosted a successful community strategy session.', icon: 'Mic', rarity: 'Rare' },
  { id: 'b-4', name: 'Top Forecaster', description: 'Achieved 90%+ accuracy in community polls.', icon: 'Target', rarity: 'Legendary' },
];

const mockUserReputation: UserReputation = {
  username: 'Deepak Kumar',
  reputationScore: 1200,
  level: 14,
  nextLevelProgress: 65,
  activityPoints: 450,
  badges: [mockBadges[0], mockBadges[1]]
};

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'MarketMaven', avatar: 'https://picsum.photos/seed/maven/200/200', reputationScore: 15400, badges: ['Verified Analyst', 'Expert Contributor'], trend: 'stable' },
  { rank: 2, username: 'WealthBuilder', avatar: 'https://picsum.photos/seed/wealth/200/200', reputationScore: 12200, badges: ['AMA Host', 'Expert Contributor'], trend: 'up' },
  { rank: 3, username: 'SarahCrypto', avatar: 'https://picsum.photos/seed/defi/200/200', reputationScore: 8500, badges: ['Top Forecaster'], trend: 'down' },
  { rank: 4, username: 'AlphaHunter', avatar: 'https://picsum.photos/seed/alpha/200/200', reputationScore: 4200, badges: ['Verified Analyst'], trend: 'up' },
  { rank: 5, username: 'DividendDan', avatar: 'https://picsum.photos/seed/dan/200/200', reputationScore: 3800, badges: ['Expert Contributor'], trend: 'stable' },
];

const mockPredictionContests: PredictionContest[] = [
  {
    id: 'cont-1',
    name: 'March Market Movers',
    description: 'Predict the top performing assets in the S&P 500 for the week of March 15th. Highest precision wins.',
    assets: ['AAPL', 'NVDA', 'MSFT', 'TSLA'],
    status: 'ongoing',
    endsAt: '2024-03-22T00:00:00Z',
    reward: 'Exclusive "Elite Forecaster" Badge + 500 Rep Nodes',
    topParticipants: ['MarketMaven', 'WealthBuilder'],
    participants: [
      { username: 'MarketMaven', points: 150, rank: 1, avatar: 'https://picsum.photos/seed/maven/100/100' },
      { username: 'WealthBuilder', points: 142, rank: 2, avatar: 'https://picsum.photos/seed/wealth/100/100' },
      { username: 'SarahCrypto', points: 128, rank: 3, avatar: 'https://picsum.photos/seed/defi/100/100' },
    ]
  },
  {
    id: 'cont-2',
    name: 'The Yield Curve Challenge',
    description: 'Guess the exact inversion point of the 2-10 spread by the end of Q1. Institutional credit at stake.',
    assets: ['US10Y', 'US02Y'],
    status: 'upcoming',
    endsAt: '2024-03-31T00:00:00Z',
    reward: 'Strategic Partnership Slot with Platform Leads',
    topParticipants: [],
    participants: []
  },
  {
    id: 'cont-3',
    name: 'DeFi TVL Sprint',
    description: 'Predict which L2 protocol will see the highest TVL growth in March.',
    assets: ['ARB', 'OP', 'BASE'],
    status: 'closed',
    endsAt: '2024-03-01T00:00:00Z',
    reward: 'Gas-rebate tokens + verified researcher status',
    topParticipants: ['SarahCrypto'],
    participants: [
      { username: 'SarahCrypto', points: 240, rank: 1, avatar: 'https://picsum.photos/seed/defi/100/100' },
      { username: 'AlphaHunter', points: 180, rank: 2, avatar: 'https://picsum.photos/seed/alpha/100/100' },
    ]
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
      trendingDiscussions: mockTrending,
      userReputation: mockUserReputation,
      leaderboard: mockLeaderboard,
      predictionContests: mockPredictionContests
    },
    status: 200,
  };
};
