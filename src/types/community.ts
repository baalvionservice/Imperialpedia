/**
 * @fileOverview Type definitions for the platform's community and engagement engine.
 */

export type VoteType = 'Bull' | 'Bear' | 'Neutral';

export interface Comment {
  id: string;
  comment_id: string | number;
  username: string;
  avatar?: string;
  reputation: number;
  reputationScore: number;
  badge?: string;
  timestamp: string;
  content: string;
  text?: string;
  upvotes: number;
  downvotes: number;
  bullBearVote: VoteType;
  bull_bear?: VoteType;
  replies?: Comment[];
  parent_id?: string | number;
  isFlagged?: boolean;
}

export interface PollOption {
  option: string;
  votes: number;
}

export interface Poll {
  id: string;
  poll_id?: number | string;
  question: string;
  options: string[] | PollOption[];
  votes: number[]; // For legacy compatibility
  totalVotes: number;
  expiresAt: string;
  closing_date?: string;
  status: 'active' | 'closed' | 'ongoing';
}

export interface CommunityBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Expert';
}

export interface UserReputation {
  username: string;
  reputationScore: number;
  level: number;
  nextLevelProgress: number;
  activityPoints: number;
  badges: CommunityBadge[];
}

/**
 * Prompt 62: Prediction Contest Types
 */
export interface UserPrediction {
  id: string;
  contestName: string;
  asset: string;
  prediction: string;
  result: 'Correct' | 'Incorrect' | 'Pending';
  points: number;
  rank?: number;
  date: string;
  reasoning?: string;
  direction?: 'Bull' | 'Bear';
}

export interface ContestLeaderboardEntry {
  rank: number;
  user: string;
  avatar?: string;
  prediction: string;
  accuracy: string;
  points: number;
}

export interface PredictionContest {
  id: string;
  title: string;
  asset: string;
  question: string;
  description: string;
  participants: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  startDate: string;
  endDate: string;
  prize?: string;
  outcome?: string;
  winnerList?: string[];
  assets?: string[]; // Legacy mapping
}

export interface CommunityData {
  comments: Comment[];
  trendingDiscussions: string[];
  polls: Poll[];
  userReputation: UserReputation;
  leaderboard: LeaderboardEntry[];
  predictionContests: PredictionContest[];
  reputation_list: ReputationEntry[];
  leaderboards_full: LeaderboardItem[];
}

export interface ReputationContribution {
  posts: number;
  comments: number;
  polls: number;
}

export interface ReputationEntry {
  username: string;
  avatar: string;
  reputation_points: number;
  badges: string[];
  contributions: ReputationContribution;
}

export interface LeaderboardItem {
  rank: number;
  username: string;
  avatar: string;
  total_points: number;
  badges?: string[];
  trend?: 'up' | 'down' | 'stable';
}

export interface LeaderboardEntry {
  rank?: number;
  username: string;
  avatar?: string;
  reputation: number;
  reputationScore?: number;
  badges?: string[];
  trend?: 'up' | 'down' | 'stable';
}

export interface RankedUser {
  rank: number;
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: 'Author' | 'Analyst' | 'Member';
  articles: number;
  followers: number;
  engagement_score: number;
  badge: string;
  reputation: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface CommunityRankingsData {
  leaderboard: RankedUser[];
  categories: string[];
}
