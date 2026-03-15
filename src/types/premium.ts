/**
 * @fileOverview Type definitions for the platform's subscription and premium systems.
 */

export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: string;
  priceYearly: string;
  features: string[];
  isPopular?: boolean;
  color?: 'primary' | 'secondary' | 'emerald';
}

export interface PremiumState {
  tiers: SubscriptionTier[];
  activeTier: string;
  trialInfo: {
    available: boolean;
    durationDays: number;
  };
}

export interface CheckoutSession {
  tierId: string;
  billingCycle: 'monthly' | 'yearly';
  status: 'idle' | 'processing' | 'completed' | 'error';
}

export interface PremiumReport {
  id: string;
  report_name: string;
  type: 'chart' | 'table' | 'summary';
  category: string;
  data: any[];
}

export interface PremiumAnalytics {
  type: 'portfolio_deep_dive' | 'historical_sentiment' | 'backtesting';
  summary?: string;
  data?: any[];
  results?: any[];
}
