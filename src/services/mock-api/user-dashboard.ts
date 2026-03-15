import { ApiResponse } from '@/types';
import { UserDashboardData } from '@/types/user-system';

/**
 * @fileOverview Mock service for retrieving personalized user dashboard data.
 */

export const getMockUserDashboard = async (): Promise<ApiResponse<UserDashboardData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  return {
    data: {
      user_details: {
        name: "Deepak Kumar",
        email: "allenkrewzz1@gmail.com",
        subscription_tier: "Pro",
        avatar: "https://picsum.photos/seed/deepak/200/200"
      },
      watchlists_overview: [
        { id: 'w1', asset: 'Bitcoin', symbol: 'BTC', currentValue: '$64,250.00', change: '+2.4%', isPositive: true, sentiment: 'Bullish' },
        { id: 'w2', asset: 'Apple Inc.', symbol: 'AAPL', currentValue: '$182.50', change: '-0.8%', isPositive: false, sentiment: 'Neutral' },
        { id: 'w3', asset: 'NVIDIA', symbol: 'NVDA', currentValue: '$875.20', change: '+5.2%', isPositive: true, sentiment: 'Bullish' },
        { id: 'w4', asset: 'Ethereum', symbol: 'ETH', currentValue: '$3,450.00', change: '-1.2%', isPositive: false, sentiment: 'Bearish' },
      ],
      portfolio_summary: {
        total_value: "$52,450.00",
        gain_loss: "+$2,540.00",
        gain_loss_percent: "+5.1%",
        allocation: [
          { asset: 'Equities', percentage: 45, value: 23602 },
          { asset: 'Crypto', percentage: 35, value: 18357 },
          { asset: 'Fixed Income', percentage: 15, value: 7867 },
          { asset: 'Cash', percentage: 5, value: 2624 },
        ],
        history: dates.map((date, i) => ({
          date,
          value: 45000 + (i * 250) + (Math.random() * 1000)
        }))
      },
      saved_articles: [
        { id: 'art-1', title: 'Understanding Yield Curve Inversion', route: '/articles/understanding-yield-curve-inversion', category: 'Economics' },
        { id: 'art-5', title: 'Passive Income with Dividends', route: '/articles/dividend-income', category: 'Investing' },
      ],
      saved_calculators: [
        { id: 'calc-1', name: 'Compound Interest Engine', route: '/financial-tools/compound-interest', type: 'Growth' },
        { id: 'calc-2', name: 'Loan Repayment Auditor', route: '/financial-tools/loan', type: 'Debt' },
      ],
      activity_history: [
        { id: 'a1', action: 'Logged in from new device: Desktop Chrome', timestamp: '2024-03-12T10:30:00Z' },
        { id: 'a2', action: 'Added NVIDIA (NVDA) to watchlist', timestamp: '2024-03-11T16:20:00Z' },
        { id: 'a3', action: 'Used Compound Interest Engine', timestamp: '2024-03-10T14:45:00Z' },
      ],
      notifications: [
        { id: 'n1', type: 'alert', message: 'NVDA price up 5% in the last 24 hours.', read_status: false, date: '2024-03-12T09:00:00Z' },
        { id: 'n2', type: 'social', message: 'The Market Maven published a new analysis on Bond Yields.', read_status: true, date: '2024-03-11T11:30:00Z' },
        { id: 'n3', type: 'update', message: 'System Update: New Multi-Asset Comparison tool is now live.', read_status: false, date: '2024-03-10T15:00:00Z' },
      ],
      preferences: {
        dark_mode: true,
        beta_opt_in: true,
        custom_alerts: ["NVDA volume > 1M", "BTC sentiment bearish"]
      }
    },
    status: 200
  };
};
