import { ApiResponse, SubscriptionTier, PremiumState, PremiumReport, PremiumAnalytics } from '@/types';

/**
 * @fileOverview Mock service for managing subscription tiers, premium reports, and advanced analytics.
 */

const mockTiers: SubscriptionTier[] = [
  {
    id: 'tier-basic',
    name: 'Basic',
    description: 'Foundational access for retail learners.',
    priceMonthly: '$0',
    priceYearly: '$0',
    features: [
      'Access to free articles',
      'Standard glossary terms',
      'Basic financial calculators',
      'Public community forums'
    ],
    color: 'primary'
  },
  {
    id: 'tier-pro',
    name: 'Pro',
    description: 'The definitive suite for serious analysts.',
    priceMonthly: '$20',
    priceYearly: '$200',
    features: [
      'Advanced AI Analyst Suite',
      'Bull/Bear Case Generators',
      'Full Portfolio Intelligence',
      'Exportable Research Nodes',
      'Early access to Beta features',
      'Priority Editorial support'
    ],
    isPopular: true,
    color: 'secondary'
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise',
    description: 'Institutional-grade research infrastructure.',
    priceMonthly: '$100',
    priceYearly: '$1,000',
    features: [
      'Programmatic API access',
      'Custom strategy builder',
      'Institutional heatmaps',
      'Dedicated account executive',
      'Bulk expert verification',
      'White-label reporting'
    ],
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
      activeTier: 'tier-pro', // Simulating a Pro user for these views
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
      },
      {
        id: 'rep-3',
        report_name: "DeFi Yield Benchmarks",
        type: "summary",
        category: "Web3 Intelligence",
        data: [{ protocol: "Aave", apy: "4.2%" }, { protocol: "Compound", apy: "3.8%" }]
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
        summary: "Your portfolio shows a high concentration in large-cap technology (45%), which has provided 2.4x the benchmark yield this cycle. However, risk telemetry suggests a potential 12% drawdown exposure in the event of a hawkish Fed shift."
      },
      {
        type: "historical_sentiment",
        data: [
          { date: "2024-03-08", sentiment_score: 0.72, price_index: 100 },
          { date: "2024-03-09", sentiment_score: 0.68, price_index: 102 },
          { date: "2024-03-10", sentiment_score: 0.65, price_index: 101 },
          { date: "2024-03-11", sentiment_score: 0.75, price_index: 105 },
          { date: "2024-03-12", sentiment_score: 0.82, price_index: 108 }
        ]
      },
      {
        type: "backtesting",
        results: [
          { strategy: "SIP Growth (Balanced)", mock_return: "+14.2%", max_drawdown: "-4.5%" },
          { strategy: "Aggensive Momentum", mock_return: "+28.5%", max_drawdown: "-18.2%" },
          { strategy: "Defensive Hedge", mock_return: "+6.8%", max_drawdown: "-1.2%" }
        ]
      }
    ],
    status: 200
  };
};
