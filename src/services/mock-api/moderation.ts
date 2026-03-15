import { ApiResponse, ModerationItem } from '@/types';

/**
 * @fileOverview Mock service for content moderation data.
 */

const mockModerationQueue: ModerationItem[] = [
  { id: 'm-1', content: 'Understanding Yield Curve Inversion', creator: 'marketmaven', reportType: 'Spam', status: 'Pending', date: '2024-03-12T10:30:00Z' },
  { id: 'm-2', content: 'Macro Trends in 2026', creator: 'econvance', reportType: 'Fact Check', status: 'Reviewed', date: '2024-03-11T16:45:00Z' },
  { id: 'm-3', content: 'DeFi Liquidity Pools', creator: 'defianalyst', reportType: 'Plagiarism', status: 'Action Taken', date: '2024-03-10T09:15:00Z' },
  { id: 'm-4', content: 'Passive Income with Dividends', creator: 'dividenddan', reportType: 'Inaccurate Data', status: 'Pending', date: '2024-03-12T11:00:00Z' },
  { id: 'm-5', content: 'Institutional Yield Strategies', creator: 'wealthbuilder', reportType: 'Copyright', status: 'Reviewed', date: '2024-03-11T14:20:00Z' },
];

export const getPendingContent = async (): Promise<ApiResponse<any[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockModerationQueue,
    status: 200,
  };
};

export const getModerationQueue = async (): Promise<ApiResponse<ModerationItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockModerationQueue,
    status: 200,
  };
};
