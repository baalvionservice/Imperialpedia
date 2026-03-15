/**
 * @fileOverview Type definitions for the Global Search System.
 */

export type SearchResultType = 'article' | 'author' | 'calculator' | 'topic' | 'glossary';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  route: string;
  category?: string;
  author?: string;
  tags?: string[];
}

export interface SearchSuggestion {
  id: string;
  type: SearchResultType;
  title: string;
  route: string;
}

export interface SearchFilters {
  type?: SearchResultType | 'all';
  category?: string;
  author?: string;
  tags?: string[];
}

export interface AdvancedSearchFilters extends SearchFilters {
  query?: string;
}
