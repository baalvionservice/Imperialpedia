import { ApiResponse } from '@/types';
import { CommunityData, Comment, Poll, UserReputation, LeaderboardEntry, CommunityBadge, PredictionContest } from '@/types/community';

/**
 * @fileOverview Mock service for the Community and Engagement engine.
 * Refined for Prompt 38 requirements.
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
    content: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction.',
    text: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction.',
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
        content: 'Correct, but we should also consider the high consumer cash reserves.',
        text: 'Correct, but we should also consider the high consumer cash reserves.',
        upvotes: 12,
        downvotes: 1,
        bullBearVote: 'Neutral',
        bull_bear: 'Neutral',
      }
    ]
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
    poll_id: 1,
    question: 'Will XYZ Corp beat earnings this quarter?',
    options: [
      { option: 'Yes', votes: 120 },
      { option: 'No', votes: 45 }
    ],
    votes: [120, 45],
    totalVotes: 165,
    expiresAt: '2026-03-20T00:00:00Z',
    closing_date: '2026-03-20',
    status: 'active'
  },
  {
    id: 'p-2',
    poll_id: 2,
    question: 'Is ABC Inc a buy at current valuations?',
    options: [
      { option: 'Yes', votes: 80 },
      { option: 'No', votes: 60 }
    ],
    votes: [80, 60],
    totalVotes: 140,
    expiresAt: '2026-03-10T00:00:00Z',
    closing_date: '2026-03-10',
    status: 'closed'
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
    contest_id: 1,
    name: 'Weekly Stock Picks',
    description: 'Predict the top 3 performers this week across the S&P 500 taxonomy.',
    assets: ['AAPL', 'NVDA', 'TSLA'],
    status: 'ongoing',
    start_date: '2026-03-15',
    end_date: '2026-03-21',
    endsAt: '2026-03-21T23:59:59Z',
    reward: 'Grand Oracle Badge',
    prize: 'Mock Badge',
    participants: [
      { username: 'User123', points: 50, avatar: 'https://picsum.photos/seed/u1/100/100' },
      { username: 'User456', points: 40, avatar: 'https://picsum.photos/seed/u2/100/100' }
    ]
  },
  {
    id: 'cont-2',
    contest_id: 2,
    name: 'Quarterly Earnings Surprises',
    description: 'Identify which large-cap tech companies will post a 5%+ EPS beat.',
    assets: ['MSFT', 'GOOGL', 'AMZN'],
    status: 'upcoming',
    start_date: '2026-04-01',
    end_date: '2026-04-30',
    endsAt: '2026-04-30T23:59:59Z',
    reward: '500 Reputation Nodes',
    prize: 'Mock Points',
    participants: [
      { username: 'User789', points: 70, avatar: 'https://picsum.photos/seed/u3/100/100' }
    ]
  }
];

export const getCommunityData = async (): Promise<ApiResponse<CommunityData>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      comments: mockComments,
      polls: mockPolls,
      trendingDiscussions: ['Yield Curve 2026', 'Fed Liquidity', 'AI Chip Wars', 'CBDC Rollout'],
      userReputation: mockUserReputation,
      leaderboard: mockLeaderboard,
      predictionContests: mockPredictionContests
    },
    status: 200,
  };
};
