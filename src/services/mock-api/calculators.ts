import { ApiResponse } from '@/types';

/**
 * @fileOverview Mock service for managing financial calculator metadata.
 */

export interface Calculator {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
}

const mockCalculators: Calculator[] = [
  {
    id: 'calc-1',
    name: 'Compound Interest Calculator',
    slug: 'compound-interest',
    description: 'Calculate how your savings grow over time with compounding.',
    category: 'Personal Finance',
  },
  {
    id: 'calc-2',
    name: 'Mortgage Payment Calculator',
    slug: 'mortgage',
    description: 'Estimate your monthly mortgage payments and total interest.',
    category: 'Real Estate',
  },
];

export const getCalculatorList = async (): Promise<ApiResponse<Calculator[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockCalculators,
    status: 200,
  };
};
