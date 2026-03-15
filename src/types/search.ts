/**
 * @fileOverview Type definitions for the Global Search System.
 */

export type SearchResultType = 'article' | 'author' | 'calculator' | 'topic' | 'glossary';

export type SearchSortOption = 'relevance' | 'latest' | 'popular';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  route: string;
  category?: string;
  author?: string;
  tags?: string[];
  date?: string; // ISO timestamp
  views?: number;
}

export interface SearchSuggestion {
  id: string;
  type: SearchResultType;
  title: string;
  route: string;
}

export interface TopicRecommendation {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  isTrending?: boolean;
  category?: string;
}

export interface SearchFilters {
  type?: SearchResultType | 'all';
  category?: string;
  author?: string;
  tags?: string[];
  sortBy?: SearchSortOption;
}

export interface AdvancedSearchFilters extends SearchFilters {
  query?: string;
}
