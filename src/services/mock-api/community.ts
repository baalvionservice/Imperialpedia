import { ApiResponse } from '@/types';
import { CommunityData, Comment, Poll, UserReputation, LeaderboardEntry, CommunityBadge, PredictionContest, ReputationEntry, LeaderboardItem } from '@/types/community';

/**
 * @fileOverview Mock service for the Community and Engagement engine.
 * Refined for Prompt 39 requirements.
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

// Prompt 39: Reputation List
const mockReputationList: ReputationEntry[] = [
  { 
    username: "User123", 
    avatar: "https://picsum.photos/seed/u123/200/200", 
    reputation_points: 120, 
    badges: ["Expert", "Top Contributor"], 
    contributions: { posts: 25, comments: 40, polls: 5 } 
  },
  { 
    username: "User456", 
    avatar: "https://picsum.photos/seed/u456/200/200", 
    reputation_points: 85, 
    badges: ["Contributor"], 
    contributions: { posts: 15, comments: 20, polls: 2 } 
  },
  { 
    username: "AlphaHunter", 
    avatar: "https://picsum.photos/seed/alpha/200/200", 
    reputation_points: 110, 
    badges: ["Oracle", "Vetted Analyst"], 
    contributions: { posts: 12, comments: 150, polls: 18 } 
  }
];

// Prompt 39: Leaderboards Full
const mockLeaderboardsFull: LeaderboardItem[] = [
  { rank: 1, username: "User123", avatar: "https://picsum.photos/seed/u123/200/200", total_points: 120, badges: ["Expert", "Top Contributor"], trend: 'up' },
  { rank: 2, username: "AlphaHunter", avatar: "https://picsum.photos/seed/alpha/200/200", total_points: 110, badges: ["Oracle"], trend: 'stable' },
  { rank: 3, username: "User456", avatar: "https://picsum.photos/seed/u456/200/200", total_points: 85, badges: ["Contributor"], trend: 'down' },
  { rank: 4, username: "Julian Wealth", avatar: "https://picsum.photos/seed/wealth/200/200", total_points: 72, badges: ["Expert"], trend: 'up' },
  { rank: 5, username: "Sarah Crypto", avatar: "https://picsum.photos/seed/defi/200/200", total_points: 65, badges: ["Early Adopter"], trend: 'up' },
];

const mockLeaderboard: LeaderboardEntry[] = mockLeaderboardsFull.map(item => ({
  rank: item.rank,
  username: item.username,
  avatar: item.avatar,
  reputation: item.total_points,
  badges: item.badges,
  trend: item.trend
}));

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
  }
];

const mockUserReputation: UserReputation = {
  username: 'User123', // Active User Simulation
  reputationScore: 120,
  level: 14,
  nextLevelProgress: 65,
  activityPoints: 120,
  badges: [
    { id: 'b-1', name: 'Expert Contributor', description: 'Published 10+ research nodes.', icon: 'Award', rarity: 'Expert' },
    { id: 'b-2', name: 'Top Contributor', description: 'Consistently high engagement.', icon: 'Star', rarity: 'Rare' }
  ]
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
      predictionContests: mockPredictionContests,
      reputation_list: mockReputationList,
      leaderboards_full: mockLeaderboardsFull
    },
    status: 200,
  };
};
