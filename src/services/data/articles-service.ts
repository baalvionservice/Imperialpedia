import * as mockApi from '@/services/mock-api/articles';
import { Article, ApiResponse, PaginatedResponse } from '@/types';

/**
 * @fileOverview Abstraction layer for article-related data fetching.
 */

export const articlesService = {
  async getArticles(page?: number, limit?: number): Promise<PaginatedResponse<Article>> {
    try {
      return await mockApi.getArticles(page, limit);
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Articles service unavailable',
        pagination: {
          currentPage: 1,
          totalPages: 0,
          pageSize: limit || 10,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
  },

  async getArticleBySlug(slug: string): Promise<ApiResponse<Article | null>> {
    try {
      return await mockApi.getArticleBySlug(slug);
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: 'Article retrieval failed',
      };
    }
  },

  async getFeaturedArticles(): Promise<ApiResponse<Article[]>> {
    try {
      return await mockApi.getFeaturedArticles();
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Featured articles unavailable',
      };
    }
  },
};
