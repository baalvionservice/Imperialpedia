import { ApiResponse, SubscriptionTier, PremiumState } from '@/types';

/**
 * @fileOverview Mock service for managing subscription tiers and payment states.
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
      activeTier: 'tier-basic',
      trialInfo: {
        available: true,
        durationDays: 14
      }
    },
    status: 200
  };
};
