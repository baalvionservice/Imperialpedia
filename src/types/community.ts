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
 * Prompt 39: Reputation & Leaderboard Types
 */
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

export interface ContestParticipant {
  username: string;
  points: number;
  rank?: number;
  avatar?: string;
}

export interface PredictionContest {
  id: string;
  contest_id?: number | string;
  name: string;
  description: string;
  assets: string[];
  participants: ContestParticipant[];
  topParticipants?: string[];
  status: 'ongoing' | 'upcoming' | 'closed';
  reward?: string;
  prize?: string;
  start_date?: string;
  end_date?: string;
  endsAt: string;
}

export interface CommunityData {
  comments: Comment[];
  trendingDiscussions: string[];
  polls: Poll[];
  userReputation: UserReputation;
  leaderboard: LeaderboardEntry[];
  predictionContests: PredictionContest[];
  // Prompt 39 specific fields
  reputation_list: ReputationEntry[];
  leaderboards_full: LeaderboardItem[];
}
