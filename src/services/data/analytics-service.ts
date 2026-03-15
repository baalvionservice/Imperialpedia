import * as mockApi from '@/services/mock-api/analytics';
import { ApiResponse } from '@/types';
import { TrendingItem } from '@/services/mock-api/analytics';

/**
 * @fileOverview Abstraction layer for analytics and trending data.
 */

export const analyticsService = {
  async getTrendingArticles(): Promise<ApiResponse<TrendingItem[]>> {
    try {
      return await mockApi.getTrendingArticles();
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Trending data unavailable',
      };
    }
  },

  async getPopularTopics(): Promise<ApiResponse<string[]>> {
    try {
      return await mockApi.getPopularTopics();
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Popular topics unavailable',
      };
    }
  },
};
