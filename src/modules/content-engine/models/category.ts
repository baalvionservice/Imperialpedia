import { Category } from '../types/category';

/**
 * @fileOverview Helper functions and constants for the Category model.
 */

export const createEmptyCategory = (): Partial<Category> => ({
  name: '',
  slug: '',
  description: '',
  articleCount: 0,
});

/**
 * Mock categories for the platform's initial taxonomy.
 */
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-economics',
    slug: 'economics',
    name: 'Economics',
    description: 'Deep dives into global macro trends, monetary policy, and fiscal analysis.',
    icon: 'TrendingUp',
    articleCount: 1,
  },
  {
    id: 'cat-investing',
    slug: 'investing',
    name: 'Investing',
    description: 'Expert strategies for wealth building, asset allocation, and market analysis.',
    icon: 'PieChart',
    articleCount: 1,
  },
  {
    id: 'cat-markets',
    slug: 'markets',
    name: 'Markets',
    description: 'Real-time analysis and historical context for equity, bond, and derivative markets.',
    icon: 'BarChart3',
    articleCount: 0,
  }
];
