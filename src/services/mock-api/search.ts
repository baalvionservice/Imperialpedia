import { ApiResponse, SearchResult, SearchSuggestion, AdvancedSearchFilters } from '@/types';

/**
 * @fileOverview Mock service for the Global Search System.
 * Expanded with diverse entity types and rich tagging for filtering verification.
 */

const mockSearchData: SearchResult[] = [
  {
    id: 'art-1',
    type: 'article',
    title: 'Understanding Yield Curve Inversion',
    snippet: 'A deep dive into what the yield curve tells us about future recessions and market signals.',
    route: '/articles/understanding-yield-curve-inversion',
    category: 'Economics',
    author: 'The Market Maven',
    tags: ['Macro', 'Yield Curve', 'Recession']
  },
  {
    id: 'art-2',
    type: 'article',
    title: 'The Power of Compound Interest',
    snippet: 'Why starting early is the most important factor in wealth building and long-term capital growth.',
    route: '/articles/the-power-of-compound-interest',
    category: 'Investing',
    author: 'Julian Wealth',
    tags: ['Wealth', 'Basics', 'Savings']
  },
  {
    id: 'creator-1',
    type: 'author',
    title: 'The Market Maven',
    snippet: 'Expert in macro-economic trends and fixed income markets. Former hedge fund analyst.',
    route: '/creator/marketmaven',
    tags: ['Macro', 'Bonds', 'Economics']
  },
  {
    id: 'creator-4',
    type: 'author',
    title: 'Eleanor Vance',
    snippet: 'Lead Administrator and Content Strategist at Imperialpedia. Expert in programmatic SEO.',
    route: '/creator/creator-4',
    tags: ['pSEO', 'Strategy', 'Growth']
  },
  {
    id: 'calc-compound',
    type: 'calculator',
    title: 'Compound Interest Engine',
    snippet: 'Precision instrument for modeling exponential growth and periodic contributions.',
    route: '/financial-tools/compound-interest',
    category: 'Wealth Building',
    tags: ['Savings', 'Growth', 'Wealth']
  },
  {
    id: 'calc-retirement',
    type: 'calculator',
    title: 'Nest Egg Architect',
    snippet: 'Project your retirement corpus based on savings, rates, and time horizons.',
    route: '/financial-tools/retirement',
    category: 'Retirement',
    tags: ['Retirement', 'Strategy', 'Future']
  },
  {
    id: 'term-1',
    type: 'glossary',
    title: 'Bull Market',
    snippet: 'A financial market where prices are rising or are expected to rise with widespread optimism.',
    route: '/glossary/bull-market',
    category: 'Markets',
    tags: ['Markets', 'Optimism', 'Growth']
  },
  {
    id: 'term-2',
    type: 'glossary',
    title: 'Quantitative Easing',
    snippet: 'A form of monetary policy where a central bank purchases at-scale government bonds.',
    route: '/glossary/quantitative-easing',
    category: 'Economics',
    tags: ['Macro', 'Fed', 'Policy']
  },
  {
    id: 'topic-1',
    type: 'topic',
    title: 'Macroeconomics Matrix',
    snippet: 'Primary taxonomy node for global economic trends, fiscal policy, and monetary indicators.',
    route: '/tags/macro',
    category: 'Economics',
    tags: ['Macro', 'Taxonomy', 'Economics']
  },
  {
    id: 'topic-2',
    type: 'topic',
    title: 'Fixed Income Intelligence',
    snippet: 'Knowledge hub covering bonds, yields, and interest rate strategies.',
    route: '/tags/interest-rates',
    category: 'Markets',
    tags: ['Yield Curve', 'Bonds', 'Markets']
  }
];

export const globalSearch = async (query: string, filters?: AdvancedSearchFilters): Promise<ApiResponse<SearchResult[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const normalizedQuery = query.toLowerCase().trim();
  
  let results = mockSearchData;

  // Apply Query Filter
  if (normalizedQuery) {
    results = results.filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.snippet.toLowerCase().includes(normalizedQuery) ||
      item.category?.toLowerCase().includes(normalizedQuery) ||
      item.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  }

  // Apply Advanced Filters
  if (filters) {
    if (filters.category && filters.category !== 'all') {
      results = results.filter(item => item.category === filters.category);
    }
    if (filters.author && filters.author !== 'all') {
      results = results.filter(item => item.author === filters.author);
    }
  }

  return {
    data: results,
    status: 200
  };
};

export const getSearchSuggestions = async (query: string): Promise<ApiResponse<SearchSuggestion[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return { data: [], status: 200 };
  }

  const suggestions = mockSearchData
    .filter(item => item.title.toLowerCase().includes(normalizedQuery))
    .map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      route: item.route
    }))
    .slice(0, 5);

  return {
    data: suggestions,
    status: 200
  };
};
