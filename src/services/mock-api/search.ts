import { ApiResponse, SearchResult } from '@/types';

/**
 * @fileOverview Mock service for the Global Search System.
 */

const mockSearchData: SearchResult[] = [
  {
    id: 'art-1',
    type: 'article',
    title: 'Understanding Yield Curve Inversion',
    snippet: 'A deep dive into what the yield curve tells us about future recessions and market signals.',
    route: '/articles/understanding-yield-curve-inversion',
    category: 'Economics',
    author: 'The Market Maven'
  },
  {
    id: 'art-2',
    type: 'article',
    title: 'The Power of Compound Interest',
    snippet: 'Why starting early is the most important factor in wealth building and long-term capital growth.',
    route: '/articles/the-power-of-compound-interest',
    category: 'Investing',
    author: 'Julian Wealth'
  },
  {
    id: 'creator-1',
    type: 'author',
    title: 'The Market Maven',
    snippet: 'Expert in macro-economic trends and fixed income markets. Former hedge fund analyst.',
    route: '/creator/marketmaven'
  },
  {
    id: 'creator-4',
    type: 'author',
    title: 'Eleanor Vance',
    snippet: 'Lead Administrator and Content Strategist at Imperialpedia. Expert in programmatic SEO.',
    route: '/creator/creator-4'
  },
  {
    id: 'calc-compound',
    type: 'calculator',
    title: 'Compound Interest Engine',
    snippet: 'Precision instrument for modeling exponential growth and periodic contributions.',
    route: '/financial-tools/compound-interest',
    category: 'Wealth Building'
  },
  {
    id: 'calc-retirement',
    type: 'calculator',
    title: 'Nest Egg Architect',
    snippet: 'Project your retirement corpus based on savings, rates, and time horizons.',
    route: '/financial-tools/retirement',
    category: 'Retirement'
  },
  {
    id: 'term-1',
    type: 'glossary',
    title: 'Bull Market',
    snippet: 'A financial market where prices are rising or are expected to rise with widespread optimism.',
    route: '/glossary/bull-market',
    category: 'Markets'
  }
];

export const globalSearch = async (query: string): Promise<ApiResponse<SearchResult[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return { data: [], status: 200 };
  }

  const results = mockSearchData.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) ||
    item.snippet.toLowerCase().includes(normalizedQuery) ||
    item.category?.toLowerCase().includes(normalizedQuery)
  );

  return {
    data: results,
    status: 200
  };
};
