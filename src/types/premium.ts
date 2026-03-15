/**
 * @fileOverview Type definitions for the platform's subscription and premium systems.
 */

export interface SubscriptionTier {
  id: string;
  name: string;
  plan_name?: string;
  description: string;
  priceMonthly: string;
  price?: number;
  priceYearly: string;
  features: string[];
  isPopular?: boolean;
  color?: 'primary' | 'secondary' | 'emerald';
}

export interface PremiumState {
  tiers: SubscriptionTier[];
  subscription_plans?: any[];
  activeTier: string;
  trialInfo: {
    available: boolean;
    durationDays: number;
  };
}

export interface PremiumReport {
  id: string;
  report_name: string;
  description: string;
  date: string;
  download_link: string;
  type: 'chart' | 'table' | 'summary';
  category: string;
  data: any[];
}

export interface BacktestingTool {
  strategy_name: string;
  parameters: {
    entry_rule: string;
    exit_rule: string;
  };
  results: {
    total_return: string;
    max_drawdown: string;
    performance_chart: string;
  };
}

export interface PremiumAnalytics {
  type: 'portfolio_deep_dive' | 'historical_sentiment' | 'backtesting';
  summary?: string;
  data?: any[];
  results?: any[];
  backtesting_tools?: BacktestingTool[];
}

export interface MockPaymentStatus {
  user: string;
  plan_selected: string;
  status: 'success' | 'failed';
  message: string;
}
