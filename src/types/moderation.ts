import { ID, Timestamp } from './common';

/**
 * @fileOverview Type definitions for the platform moderation system.
 */

export type ModerationType = 'article' | 'comment' | 'submission';
export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface ModerationItem {
  id: ID;
  type: ModerationType;
  title: string;
  author: string;
  status: ModerationStatus;
  createdAt: Timestamp;
  content?: string; // Optional preview for comments or snippets
}
