/**
 * @fileOverview Type definitions for the platform's community and engagement engine.
 */

export type VoteType = 'Bull' | 'Bear' | 'Neutral';

export interface Comment {
  id: string;
  comment_id: string | number; // Aligned with Prompt 37 JSON
  username: string;
  avatar?: string;
  reputation: number; // Aligned with Prompt 37 JSON
  reputationScore: number; // Legacy support
  badge?: string;
  timestamp: string;
  content: string;
  text?: string; // Aligned with Prompt 37 JSON
  upvotes: number;
  downvotes: number;
  bullBearVote: VoteType;
  bull_bear?: VoteType; // Aligned with Prompt 37 JSON
  replies?: Comment[];
  parent_id?: string | number; // Aligned with Prompt 37 JSON
  isFlagged?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
  totalVotes: number;
  expiresAt: string;
  status?: 'ongoing' | 'closed';
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

export interface LeaderboardEntry {
  rank?: number;
  username: string;
  avatar?: string;
  reputation: number; // Aligned with Prompt 37 JSON
  reputationScore?: number; // Legacy
  badges?: string[];
  trend?: 'up' | 'down' | 'stable';
}

export interface ContestParticipant {
  username: string;
  points: number;
  rank: number;
  avatar: string;
}

export interface PredictionContest {
  id: string;
  name: string;
  description: string;
  assets: string[];
  participants: ContestParticipant[];
  topParticipants: string[];
  status: 'ongoing' | 'upcoming' | 'closed';
  reward?: string;
  endsAt: string;
}

export interface CommunityData {
  comments: Comment[];
  trendingDiscussions: string[];
  polls: Poll[];
  userReputation: UserReputation;
  leaderboard: LeaderboardEntry[];
  predictionContests: PredictionContest[];
}
