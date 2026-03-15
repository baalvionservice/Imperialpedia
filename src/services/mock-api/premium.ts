import { ApiResponse, SubscriptionTier, PremiumState, PremiumReport, PremiumAnalytics, MockPaymentStatus, BacktestingTool, PremiumDashboardData } from '@/types/premium';

/**
 * @fileOverview Mock service for managing subscription tiers, premium reports, and advanced analytics.
 * Aligned with Prompt 41 and 54 requirements.
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
      activeTier: 'tier-pro', 
      trialInfo: {
        available: true,
        durationDays: 14
      }
    },
    status: 200
  };
};

const mockReports: PremiumReport[] = [
  {
    id: 'rep-1',
    report_name: "AI Portfolio Deep Dive",
    description: "Mock analysis of asset allocation and risk weightings across indexed nodes.",
    date: "2026-03-15",
    download_link: "mock_link",
    type: "summary",
    category: "Tactical Research",
    data: [
      { protocol: "Tech Growth Cluster", apy: "+12.4%" },
      { protocol: "Fixed Income Hedge", apy: "+4.2%" },
      { protocol: "Liquidity Buffer", apy: "0.5%" }
    ]
  },
  {
    id: 'rep-2',
    report_name: "Historical Sentiment Chart",
    description: "Mock sentiment analysis over time correlated with primary market price action.",
    date: "2026-03-14",
    download_link: "mock_link",
    type: "chart",
    category: "Market Audit",
    data: [
      { asset: "NVDA", value: 85 },
      { asset: "AAPL", value: 62 },
      { asset: "MSFT", value: 58 },
      { asset: "BTC", value: 74 }
    ]
  },
  {
    id: 'rep-3',
    report_name: "Sector Rotation Matrix",
    description: "Identifying capital migration from defensive to cyclical nodes.",
    date: "2026-03-12",
    download_link: "mock_link",
    type: "table",
    category: "Institutional",
    data: [
      { sector: "Technology", performance: "+15.2%", volatility: "Low" },
      { sector: "Energy", performance: "-2.1%", volatility: "Medium" },
      { sector: "Consumer Staples", performance: "+1.4%", volatility: "Low" }
    ]
  }
];

export const getPremiumReports = async (): Promise<ApiResponse<PremiumReport[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: mockReports,
    status: 200,
  };
};

const mockBacktestingTools: BacktestingTool[] = [
  {
    strategy_name: "Mock Strategy 1",
    parameters: { entry_rule: "RSI < 30", exit_rule: "RSI > 70" },
    results: { total_return: "12%", max_drawdown: "5%", performance_chart: "mock_chart_placeholder" }
  },
  {
    strategy_name: "Mock Strategy 2",
    parameters: { entry_rule: "SMA 50 Cross Above SMA 200", exit_rule: "Trailing Stop 5%" },
    results: { total_return: "8%", max_drawdown: "3%", performance_chart: "mock_chart_placeholder" }
  }
];

export const getPremiumAnalytics = async (): Promise<ApiResponse<PremiumAnalytics[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  return {
    data: [
      {
        type: "portfolio_deep_dive",
        summary: "Your portfolio shows a high concentration in large-cap technology (45%), which has provided 2.4x the benchmark yield this cycle."
      },
      {
        type: "historical_sentiment",
        data: dates.map(date => ({
          date,
          sentiment_score: Math.floor(Math.random() * 40) + 30,
          price_index: Math.floor(Math.random() * 1000) + 5000
        }))
      },
      {
        type: "backtesting",
        backtesting_tools: mockBacktestingTools
      }
    ],
    status: 200
  };
};

/**
 * Prompt 54: Premium Dashboard Mock API
 */
const mockPremiumDashboardData: PremiumDashboardData = {
  analytics_kpis: [
    { metric: "Active Users", value: 1250, trend: "mock_up" },
    { metric: "New Subscriptions", value: 320, trend: "mock_down" },
    { metric: "Revenue", value: "$12,500", trend: "mock_up" },
    { metric: "Conversion Rate", value: "4.8%", trend: "mock_stable" }
  ],
  reports: [
    { report_name: "Weekly Revenue", type: "PDF", status: "mock_ready", last_generated: "2026-03-15 08:00" },
    { report_name: "Monthly Subscription Trends", type: "CSV", status: "mock_ready", last_generated: "2026-03-14 18:00" },
    { report_name: "Feature Usage Audit", type: "PDF", status: "mock_generating", last_generated: "Processing..." }
  ],
  advanced_metrics: [
    { metric: "Churn Rate", value: "3%", segment: "All Plans" },
    { metric: "Retention Rate", value: "92%", segment: "Premium Plan" },
    { metric: "LTV", value: "$450", segment: "New Users" },
    { metric: "Avg. Session Depth", value: "12.4m", segment: "Pro Tier" }
  ],
  growth_chart_data: Array.from({ length: 12 }, (_, i) => ({
    date: `Month ${i + 1}`,
    revenue: 8000 + Math.random() * 5000,
    users: 800 + Math.random() * 600
  }))
};

export const getPremiumDashboardData = async (): Promise<ApiResponse<PremiumDashboardData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: mockPremiumDashboardData,
    status: 200,
  };
};
