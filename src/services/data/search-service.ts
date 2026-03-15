import * as mockApi from '@/services/mock-api/search';
import { ApiResponse, SearchResult, SearchSuggestion } from '@/types';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for Global Search data fetching.
 */

export const searchService = {
  async performSearch(query: string): Promise<ApiResponse<SearchResult[]>> {
    try {
      return await mockApi.globalSearch(query);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getSuggestions(query: string): Promise<ApiResponse<SearchSuggestion[]>> {
    try {
      return await mockApi.getSearchSuggestions(query);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  }
};
