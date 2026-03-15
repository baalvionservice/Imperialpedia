import { ID, Timestamp } from './common';

/**
 * @fileOverview Creator and Expert related types.
 */

export interface CreatorStats {
  followersCount: number;
  followingCount: number;
  articlesCount: number;
  totalViews: number;
}

export interface CreatorContent {
  recentArticles: Array<{
    id: ID;
    title: string;
    slug: string;
    publishedAt: Timestamp;
    category: string;
  }>;
}

export interface CreatorProfile {
  id: ID;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  joinedDate: Timestamp;
  specialties: string[];
  stats: CreatorStats;
  content: CreatorContent;
  verified: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}
