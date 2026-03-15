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
