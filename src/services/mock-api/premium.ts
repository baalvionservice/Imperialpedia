import { ApiResponse, SubscriptionTier, PremiumState, PremiumReport, PremiumAnalytics, MockPaymentStatus } from '@/types/premium';

/**
 * @fileOverview Mock service for managing subscription tiers, premium reports, and advanced analytics.
 * Aligned with Prompt 40 requirements.
 */

const mockSubscriptionPlans = [
  { plan_name: "Free", price: 0, features: ["Access to basic content", "Limited calculators"] },
  { plan_name: "Pro", price: 29.99, features: ["Full content access", "Advanced calculators", "AI portfolio insights"] },
  { plan_name: "Enterprise", price: 99.99, features: ["Team accounts", "API access", "Custom reports"] }
];

const mockTiers: SubscriptionTier[] = [
  {
    id: 'tier-free',
    name: 'Free',
    plan_name: 'Free',
    description: 'Foundational access for retail learners.',
    priceMonthly: '$0',
    price: 0,
    priceYearly: '$0',
    features: mockSubscriptionPlans[0].features,
    color: 'primary'
  },
  {
    id: 'tier-pro',
    name: 'Pro',
    plan_name: 'Pro',
    description: 'The definitive suite for serious analysts.',
    priceMonthly: '$29.99',
    price: 29.99,
    priceYearly: '$299',
    features: mockSubscriptionPlans[1].features,
    isPopular: true,
    color: 'secondary'
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise',
    plan_name: 'Enterprise',
    description: 'Institutional-grade research infrastructure.',
    priceMonthly: '$99.99',
    price: 99.99,
    priceYearly: '$999',
    features: mockSubscriptionPlans[2].features,
    color: 'emerald'
  }
];

const mockPaymentStatuses: MockPaymentStatus[] = [
  { user: "User123", plan_selected: "Pro", status: "success", message: "Payment successful" },
  { user: "User456", plan_selected: "Enterprise", status: "failed", message: "Card declined" }
];

export const getSubscriptionTiers = async (): Promise<ApiResponse<SubscriptionTier[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockTiers,
    status: 200,
  };
};

export const getPremiumState = async (): Promise<ApiResponse<PremiumState>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: {
      tiers: mockTiers,
      subscription_plans: mockSubscriptionPlans,
      activeTier: 'tier-free', 
      trialInfo: {
        available: true,
        durationDays: 14
      }
    },
    status: 200
  };
};

export const getPremiumReports = async (): Promise<ApiResponse<PremiumReport[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      {
        id: 'rep-1',
        report_name: "Top Stocks This Month",
        type: "chart",
        category: "Tactical Research",
        data: [{ asset: "NVDA", value: 85 }, { asset: "AAPL", value: 62 }, { asset: "MSFT", value: 58 }, { asset: "TSLA", value: 45 }]
      },
      {
        id: 'rep-2',
        report_name: "Sector Performance",
        type: "table",
        category: "Market Audit",
        data: [{ sector: "Technology", performance: "+12.4%", volatility: "Low" }, { sector: "Renewables", performance: "+8.2%", volatility: "Medium" }, { sector: "Traditional Finance", performance: "-2.1%", volatility: "Low" }]
      }
    ],
    status: 200
  };
};

export const getPremiumAnalytics = async (): Promise<ApiResponse<PremiumAnalytics[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: [
      {
        type: "portfolio_deep_dive",
        summary: "Your portfolio shows a high concentration in large-cap technology (45%), which has provided 2.4x the benchmark yield this cycle."
      }
    ],
    status: 200
  };
};
