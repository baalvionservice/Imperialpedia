import { ApiResponse, ModerationItem } from '@/types';

/**
 * @fileOverview Mock service for content moderation data.
 */

const mockModerationItems: ModerationItem[] = [
  { id: 'mod-1', type: 'article', title: 'The Asymmetric Impact of Decentralized Fiscal Nodes', author: 'The Market Maven', status: 'pending', createdAt: '2024-03-12T10:00:00Z' },
  { id: 'mod-2', type: 'comment', title: 'Re: Yield Curve Inversion', author: 'ReaderNode_42', status: 'pending', createdAt: '2024-03-12T11:15:00Z', content: 'This is a great analysis, but what about the inverted yield curve in 1978?' },
  { id: 'mod-3', type: 'submission', title: 'Expert Profile Request: Ken Macro', author: 'Ken Macro', status: 'pending', createdAt: '2024-03-11T16:45:00Z' },
  { id: 'mod-4', type: 'comment', title: 'Re: Passive Income', author: 'SpamBot_99', status: 'flagged', createdAt: '2024-03-12T08:30:00Z', content: 'Visit my site for free money fast!!!' },
  { id: 'mod-5', type: 'article', title: 'DeFi Liquidity Cycles', author: 'Sarah Crypto', status: 'pending', createdAt: '2024-03-12T09:00:00Z' },
];

export const getPendingContent = async (): Promise<ApiResponse<ModerationItem[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockModerationItems,
    status: 200,
  };
};
