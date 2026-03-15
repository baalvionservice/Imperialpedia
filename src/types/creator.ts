import { ID, Timestamp } from './common';

/**
 * @fileOverview Creator and Expert related types.
 */

export interface CreatorStats {
  followersCount: number;
  articlesCount: number;
  totalViews: number;
}

export interface CreatorContent {
  recentArticles: Array<{
    id: ID;
    title: string;
    publishedAt: Timestamp;
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
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}
