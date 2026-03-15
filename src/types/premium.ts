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

/**
 * Prompt 54: Premium Analytics & Reporting Dashboard Types
 */
export interface PremiumAnalyticsKPI {
  metric: string;
  value: string | number;
  trend: 'mock_up' | 'mock_down' | 'mock_stable';
}

export interface PremiumReportNode {
  report_name: string;
  type: 'PDF' | 'CSV';
  status: 'mock_ready' | 'mock_generating';
  last_generated: string;
}

export interface AdvancedMetricNode {
  metric: string;
  value: string;
  segment: string;
}

export interface PremiumDashboardData {
  analytics_kpis: PremiumAnalyticsKPI[];
  reports: PremiumReportNode[];
  advanced_metrics: AdvancedMetricNode[];
  growth_chart_data: { date: string; revenue: number; users: number }[];
}

/**
 * Prompt 55: AI Portfolio Deep Dive Types
 */
export interface DeepDiveAsset {
  name: string;
  ticker: string;
  current_price: string;
  allocation: string;
  'P&L': string;
  ai_insights: {
    bull_case: 'mock_up' | 'mock_down' | 'mock_neutral';
    bear_case: 'mock_up' | 'mock_down' | 'mock_neutral';
    risk_alert: 'mock_none' | 'mock_warning' | 'mock_critical';
  };
}

export interface PortfolioDeepDiveData {
  portfolio_summary: {
    total_value: string;
    allocation: Record<string, string>;
    profit_loss: string;
    risk_score: string;
  };
  assets: DeepDiveAsset[];
  risk_diversification: {
    diversification_score: string;
    sector_exposure: Record<string, string>;
    asset_correlation: Record<string, string>;
  };
}

/**
 * Prompt 56: Advanced Asset Screeners & Strategy Builder Types
 */
export interface ScreenerNode {
  name: string;
  filters: string[];
  results: number;
  last_run?: string;
}

export interface ScreenerAsset {
  name: string;
  symbol: string;
  price: string;
  market_cap: string;
  change_24h: string;
  volume: string;
  sentiment: number;
  momentum: number;
}

export interface CustomStrategy {
  strategy_name: string;
  conditions: string[];
  status: 'mock_active' | 'mock_inactive';
}

export interface ScreenerDashboardData {
  screeners: ScreenerNode[];
  assets: ScreenerAsset[];
  strategies: CustomStrategy[];
}
