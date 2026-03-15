import * as mockApi from '@/services/mock-api/analytics';
import { ApiResponse } from '@/types';
import { TrendingItem } from '@/services/mock-api/analytics';
import { errorHandler } from '@/lib/errors/error-handler';
import { TrafficAnalytics } from '@/types/analytics';

/**
 * @fileOverview Abstraction layer for analytics and trending data with error handling.
 */

export const analyticsService = {
  async getTrendingArticles(): Promise<ApiResponse<TrendingItem[]>> {
    try {
      return await mockApi.getTrendingArticles();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getPopularTopics(): Promise<ApiResponse<string[]>> {
    try {
      return await mockApi.getPopularTopics();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getTrafficAnalytics(): Promise<ApiResponse<TrafficAnalytics | null>> {
    try {
      return await mockApi.getTrafficAnalytics();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  }
};
