import { ApiResponse } from '@/types';
import { 
  CommunityData, 
  Comment, 
  Poll, 
  UserReputation, 
  LeaderboardEntry, 
  PredictionContest, 
  ReputationEntry, 
  LeaderboardItem,
  CommunityRankingsData,
  RankedUser
} from '@/types/community';

/**
 * @fileOverview Mock service for the Community and Engagement engine.
 * Refined for Prompt 61 requirements.
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
  }
];

const mockLeaderboardsFull: LeaderboardItem[] = [
  { rank: 1, username: "User123", avatar: "https://picsum.photos/seed/u123/200/200", total_points: 120, badges: ["Expert", "Top Contributor"], trend: 'up' },
  { rank: 2, username: "AlphaHunter", avatar: "https://picsum.photos/seed/alpha/200/200", total_points: 110, badges: ["Oracle"], trend: 'stable' },
];

const mockRankedUsers: RankedUser[] = [
  { rank: 1, id: 'u-1', name: "Daniel Foster", username: "dfoster", avatar: "https://picsum.photos/seed/daniel/200/200", role: "Analyst", articles: 54, followers: 18200, engagement_score: 96, badge: "Top Contributor", reputation: 12450, trend: 'up' },
  { rank: 2, id: 'u-2', name: "Sophia Lee", username: "slee_invest", avatar: "https://picsum.photos/seed/sophia/200/200", role: "Author", articles: 38, followers: 14100, engagement_score: 91, badge: "Rising Star", reputation: 8200, trend: 'up' },
  { rank: 3, id: 'u-3', name: "Marcus Wealth", username: "mwealth", avatar: "https://picsum.photos/seed/marcus/200/200", role: "Analyst", articles: 24, followers: 12500, engagement_score: 88, badge: "Expert Analyst", reputation: 7500, trend: 'stable' },
  { rank: 4, id: 'u-4', name: "Elena Garcia", username: "egarcia", avatar: "https://picsum.photos/seed/elena/200/200", role: "Author", articles: 45, followers: 9800, engagement_score: 85, badge: "Community Mentor", reputation: 6800, trend: 'up' },
  { rank: 5, id: 'u-5', name: "Julian P.", username: "j_wealth", avatar: "https://picsum.photos/seed/julian/200/200", role: "Member", articles: 12, followers: 5400, engagement_score: 78, badge: "Most Helpful", reputation: 4200, trend: 'down' },
];

const mockCommunityRankings: CommunityRankingsData = {
  leaderboard: mockRankedUsers,
  categories: [
    "Global Rankings",
    "Top Authors",
    "Most Accurate Analysts",
    "Most Active Commenters",
    "Top Community Helpers",
    "Rising Contributors"
  ]
};

export const getCommunityRankings = async (): Promise<ApiResponse<CommunityRankingsData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: mockCommunityRankings,
    status: 200,
  };
};

export const getCommunityData = async (): Promise<ApiResponse<CommunityData>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      comments: mockComments,
      polls: [],
      trendingDiscussions: ['Yield Curve 2026', 'Fed Liquidity', 'AI Chip Wars'],
      userReputation: {
        username: 'User123',
        reputationScore: 120,
        level: 14,
        nextLevelProgress: 65,
        activityPoints: 120,
        badges: []
      },
      leaderboard: [],
      predictionContests: [],
      reputation_list: mockReputationList,
      leaderboards_full: mockLeaderboardsFull
    },
    status: 200,
  };
};
