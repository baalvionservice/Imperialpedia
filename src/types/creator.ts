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
  category: string;
  region: string;
  stats: CreatorStats;
  content: CreatorContent;
  verified: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface CreatorContentItem {
  id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  createdAt: string;
  updatedAt?: string;
  views: number;
  likes: number;
  comments: number;
  slug: string;
  snippet?: string;
  scheduledAt?: string;
}

export interface CreatorDashboardSummary {
  totalArticles: number;
  totalFollowers: number;
  totalViews: number;
  engagementRate: number;
}

export interface CreatorAnalytics {
  contentId: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  revenue: number;
}

export interface CreatorDashboardAnalytics {
  totalRevenue: number;
  totalViews: number;
  totalEngagement: number;
  avgRpm: number;
  topContent: CreatorAnalytics[];
  dailyMetrics: Array<{
    date: string;
    views: number;
    revenue: number;
    engagement: number;
  }>;
}

export interface CreatorVerification {
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  verified: boolean;
  requestedAt: string;
  approvedAt?: string;
  approverId?: string;
  status: "pending" | "approved" | "rejected";
  documentsProvided: string[];
}

export interface CreatorLeaderboard {
  creatorId: string;
  name: string;
  profileImage: string;
  category: string;
  region: string;
  verified: boolean;
  totalRevenue: number;
  totalViews: number;
  totalLikes: number;
}

export interface ScheduledContent {
  id: string;
  title: string;
  scheduledAt: string;
  status: "draft" | "scheduled";
  category: string;
  tags: string[];
}

export interface CreatorSettings {
  creatorId: string;
  name: string;
  displayName: string;
  bio: string;
  profileImage: string;
  email: string;
  notifications: {
    engagement: boolean;
    followers: boolean;
    announcements: boolean;
  };
  categories: string[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
}
