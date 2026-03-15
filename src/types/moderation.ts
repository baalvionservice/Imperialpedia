import { ID, Timestamp } from './common';

/**
 * @fileOverview Type definitions for the platform moderation system.
 */

export type ModerationType = 'article' | 'comment' | 'submission';
export type ModerationStatus = 'Pending' | 'Reviewed' | 'Action Taken' | 'Approved' | 'Rejected' | 'pending' | 'approved' | 'rejected' | 'flagged';

/**
 * Standard interface for administrative moderation tasks.
 */
export interface ModerationItem {
  id: string;
  content: string;
  creator: string;
  reportType: string;
  status: 'Pending' | 'Reviewed' | 'Action Taken';
  date: string;
}

/**
 * Interface for the Moderation Approvals workflow.
 */
export interface ModerationApproval {
  id: string;
  content: string;
  fullContent?: string;
  creator: string;
  reportType: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

/**
 * Legacy/Alternative interface for content engine moderation.
 */
export interface ModerationEntry {
  id: ID;
  type: ModerationType;
  title: string;
  author: string;
  status: ModerationStatus;
  createdAt: Timestamp;
  content?: string;
}
