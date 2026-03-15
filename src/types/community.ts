/**
 * @fileOverview Type definitions for the platform's community and engagement engine.
 */

export type VoteType = 'Bull' | 'Bear' | 'Neutral';

export interface Comment {
  id: string;
  username: string;
  avatar?: string;
  reputationScore: number;
  badge?: string;
  timestamp: string;
  content: string;
  upvotes: number;
  downvotes: number;
  bullBearVote: VoteType;
  replies?: Comment[];
  isFlagged?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
  totalVotes: number;
  expiresAt: string;
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
  rank: number;
  username: string;
  avatar: string;
  reputationScore: number;
  badges: string[];
  trend: 'up' | 'down' | 'stable';
}

export interface CommunityData {
  comments: Comment[];
  trendingDiscussions: string[];
  polls: Poll[];
  userReputation: UserReputation;
  leaderboard: LeaderboardEntry[];
}
