import { ID, Slug, Timestamp } from '@/types/common';

/**
 * @fileOverview Comprehensive type definition for an Article in the Content Engine.
 */

export type ArticleStatus = 'draft' | 'review' | 'published' | 'archived';

export interface Article {
  id: ID;
  slug: Slug;
  title: string;
  description: string;
  body?: string; // Full content body
  authorId: ID;
  publishedAt?: Timestamp;
  updatedAt: Timestamp;
  category: string;
  tags: string[];
  status: ArticleStatus;
  readingTime: number; // in minutes
  featuredImage: string;
  
  // SEO specific fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

/**
 * Simplified structure for the Article Editor and Draft management.
 */
export interface ArticleDraft {
  id: ID;
  title: string;
  body: string;
  summary: string;
  category: string;
  tags: string[];
  status: 'draft' | 'submitted';
  createdAt: Timestamp;
}

export interface Writer {
  id: ID;
  name: string;
  role: 'writer';
  drafts: ArticleDraft[];
  publishedCount: number;
}
