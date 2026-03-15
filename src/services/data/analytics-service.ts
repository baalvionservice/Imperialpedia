import * as mockApi from '@/services/mock-api/analytics';
import { ApiResponse } from '@/types';
import { TrendingItem } from '@/services/mock-api/analytics';
import { errorHandler } from '@/lib/errors/error-handler';
import { TrafficAnalytics, SeoAnalytics, PlatformOverview, ContentAnalyticsReport, TrafficAnalyticsReport, EngagementAnalytics, ModerationAnalytics } from '@/types/analytics';

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
  },

  async getTrafficAnalyticsReport(): Promise<ApiResponse<TrafficAnalyticsReport | null>> {
    try {
      return await mockApi.getTrafficAnalyticsReport();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getSeoAnalytics(): Promise<ApiResponse<SeoAnalytics | null>> {
    try {
      return await mockApi.getSeoAnalytics();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getPlatformOverview(): Promise<ApiResponse<PlatformOverview | null>> {
    try {
      return await mockApi.getPlatformOverview();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getContentAnalytics(): Promise<ApiResponse<ContentAnalyticsReport | null>> {
    try {
      const response = await mockApi.getContentAnalytics();
      // Map mock response to standardized ContentAnalyticsReport
      const mapped: ContentAnalyticsReport = {
        totalViews: response.data.totalViews,
        avgEngagement: response.data.avgEngagement,
        totalArticles: response.data.totalArticles,
        avgReadTime: 402, // 6m 42s in seconds
        topContent: response.data.topArticles.map(a => ({
          id: a.articleId,
          title: a.title,
          views: a.views,
          likes: a.likes,
          shares: a.shares,
          comments: a.comments,
          seoScore: a.seoScore,
          category: a.category
        })),
        categoryBreakdown: response.data.topCategories.map(c => ({
          category: c.category,
          views: c.views
        }))
      };
      return { data: mapped, status: 200 };
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getEngagementAnalytics(): Promise<ApiResponse<EngagementAnalytics | null>> {
    try {
      return await mockApi.getEngagementAnalytics();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getModerationAnalytics(): Promise<ApiResponse<ModerationAnalytics[]>> {
    try {
      return await mockApi.getModerationAnalytics();
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
