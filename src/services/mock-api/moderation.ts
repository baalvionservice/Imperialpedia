import { ApiResponse, ModerationItem, ModerationApproval } from '@/types';

/**
 * @fileOverview Mock service for content moderation data.
 */

let mockModerationQueue: ModerationItem[] = [
  { id: 'm-1', content: 'Understanding Yield Curve Inversion', creator: 'marketmaven', reportType: 'Spam', status: 'Pending', date: '2024-03-12T10:30:00Z' },
  { id: 'm-2', content: 'Macro Trends in 2026', creator: 'econvance', reportType: 'Fact Check', status: 'Reviewed', date: '2024-03-11T16:45:00Z' },
  { id: 'm-3', content: 'DeFi Liquidity Pools', creator: 'defianalyst', reportType: 'Plagiarism', status: 'Action Taken', date: '2024-03-10T09:15:00Z' },
  { id: 'm-4', content: 'Passive Income with Dividends', creator: 'dividenddan', reportType: 'Inaccurate Data', status: 'Pending', date: '2024-03-12T11:00:00Z' },
  { id: 'm-5', content: 'Institutional Yield Strategies', creator: 'wealthbuilder', reportType: 'Copyright', status: 'Reviewed', date: '2024-03-11T14:20:00Z' },
];

let mockApprovals: ModerationApproval[] = [
  { 
    id: 'app-1', 
    content: 'The yield curve is a graphical...', 
    fullContent: 'The yield curve is a graphical representation of interest rates on debt for a range of maturities. It is often used as a benchmark for other debt in the market, such as mortgage rates or bank lending rates. Current reports indicate an inversion that has historically preceded fiscal contraction cycles.',
    creator: 'marketmaven', 
    reportType: 'Fact Check', 
    status: 'Pending', 
    date: '2024-03-12T10:30:00Z' 
  },
  { 
    id: 'app-2', 
    content: 'DeFi protocols are highly risk...', 
    fullContent: 'DeFi protocols are highly risky and should be avoided by retail investors unless they have significant technical expertise. Many yield farms are thinly veiled schemes designed to extract liquidity from unsuspecting users.',
    creator: 'defianalyst', 
    reportType: 'Spam', 
    status: 'Pending', 
    date: '2024-03-12T09:15:00Z' 
  },
  { 
    id: 'app-3', 
    content: 'Investment in gold remains the...', 
    fullContent: 'Investment in gold remains the only true hedge against the complete collapse of the fiat currency system which is expected by Q4 this year based on my proprietary model.',
    creator: 'goldbug_42', 
    reportType: 'Misinformation', 
    status: 'Pending', 
    date: '2024-03-11T16:45:00Z' 
  },
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

export const getModerationApprovals = async (): Promise<ApiResponse<ModerationApproval[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockApprovals,
    status: 200,
  };
};

export const moderateContent = async (contentId: string, action: 'Approve' | 'Reject'): Promise<ApiResponse<ModerationApproval | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const index = mockApprovals.findIndex(a => a.id === contentId);
  if (index !== -1) {
    mockApprovals[index].status = action === 'Approve' ? 'Approved' : 'Rejected';
    return {
      data: mockApprovals[index],
      status: 200,
      message: `Content successfully ${action === 'Approve' ? 'cleared' : 'rejected'}.`
    };
  }
  return {
    data: null,
    status: 404,
    message: 'Content node not found.'
  };
};
