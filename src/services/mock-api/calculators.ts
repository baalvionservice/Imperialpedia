import { ApiResponse } from '@/types';
import { FinancialCalculator } from '@/types/financial-tools';

/**
 * @fileOverview Mock service for managing financial calculator metadata and tool discovery.
 */

export interface Calculator extends FinancialCalculator {}

export const mockCalculators: Calculator[] = [
  {
    id: 'calc-compound',
    name: 'Compound Interest',
    slug: 'compound-interest',
    type: 'compound',
    description: 'Visualize the exponential growth of your savings through compounding interest and regular contributions.',
    category: 'Wealth Building',
    icon: 'TrendingUp'
  },
  {
    id: 'calc-loan',
    name: 'Loan Repayment',
    slug: 'loan',
    type: 'loan',
    description: 'Calculate monthly payments, total interest, and payoff timelines for mortgages, auto loans, or personal debt.',
    category: 'Debt Management',
    icon: 'CreditCard'
  },
  {
    id: 'calc-investment',
    name: 'Investment ROI',
    slug: 'investment',
    type: 'investment',
    description: 'Estimate the potential return on investment for stocks, real estate, or business ventures.',
    category: 'Investing',
    icon: 'PieChart'
  },
  {
    id: 'calc-retirement',
    name: 'Retirement Planner',
    slug: 'retirement',
    type: 'retirement',
    description: 'Determine if you are on track for your retirement goals based on current savings and expected returns.',
    category: 'Retirement',
    icon: 'Sunrise'
  },
  {
    id: 'calc-portfolio',
    name: 'Portfolio ROI Architect',
    slug: 'portfolio',
    type: 'portfolio',
    description: 'Architect a diversified portfolio and analyze aggregate returns across multiple asset classes.',
    category: 'Investing',
    icon: 'Layers'
  },
  {
    id: 'calc-inflation',
    name: 'Inflation Impact',
    slug: 'inflation',
    type: 'inflation',
    description: 'Understand how purchasing power changes over time and how inflation affects your long-term goals.',
    category: 'Economics',
    icon: 'ArrowUpRight'
  },
];

export const getCalculatorList = async (): Promise<ApiResponse<Calculator[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockCalculators,
    status: 200,
  };
};
