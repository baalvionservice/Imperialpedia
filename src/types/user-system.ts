/**
 * @fileOverview Type definitions for the personal user system and dashboard.
 */

export interface WatchlistItem {
  id: string;
  asset: string;
  symbol: string;
  currentValue: string;
  change: string;
  isPositive: boolean;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
}

export interface PortfolioAllocation {
  asset: string;
  percentage: number;
  value: number;
}

export interface UserDashboardData {
  user_details: {
    name: string;
    email: string;
    subscription_tier: 'Free' | 'Pro' | 'Elite';
    avatar: string;
  };
  watchlists_overview: WatchlistItem[];
  portfolio_summary: {
    total_value: string;
    gain_loss: string;
    gain_loss_percent: string;
    allocation: PortfolioAllocation[];
    history: { date: string; value: number }[];
  };
  saved_articles: { id: string; title: string; route: string; category: string }[];
  saved_calculators: { id: string; name: string; route: string; type: string }[];
  activity_history: { id: string; action: string; timestamp: string }[];
  notifications: { id: string; type: 'alert' | 'update' | 'social'; message: string; read_status: boolean; date: string }[];
  preferences: {
    dark_mode: boolean;
    beta_opt_in: boolean;
    custom_alerts: string[];
  };
}
