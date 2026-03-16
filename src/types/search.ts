/**
 * @fileOverview Type definitions for the Global Search System.
 */

export type SearchResultType = 'country' | 'company' | 'industry' | 'technology';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  route: string;
}

export interface SearchSuggestion {
  id: string;
  type: SearchResultType;
  title: string;
  route: string;
}
