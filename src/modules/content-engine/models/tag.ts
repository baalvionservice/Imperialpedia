import { Tag } from '../types/tag';

/**
 * @fileOverview Helper functions and constants for the Tag model.
 */

export const MOCK_TAGS: Tag[] = [
  { 
    id: 'tag-macro', 
    slug: 'macro', 
    name: 'Macroeconomics', 
    description: 'Broad economic trends, global indicators, and structural analysis.', 
    articleCount: 1 
  },
  { 
    id: 'tag-ir', 
    slug: 'interest-rates', 
    name: 'Interest Rates', 
    description: 'Central bank policies, yield movements, and market lending rates.', 
    articleCount: 1 
  },
  { 
    id: 'tag-recession', 
    slug: 'recession', 
    name: 'Recession', 
    description: 'Economic downturn analysis, historical cycles, and recovery signals.', 
    articleCount: 1 
  },
  { 
    id: 'tag-wealth', 
    slug: 'wealth-building', 
    name: 'Wealth Building', 
    description: 'Strategies for long-term capital growth and asset accumulation.', 
    articleCount: 1 
  },
  { 
    id: 'tag-basics', 
    slug: 'basics', 
    name: 'Basics', 
    description: 'Fundamental financial concepts for beginners and foundation building.', 
    articleCount: 1 
  },
];
