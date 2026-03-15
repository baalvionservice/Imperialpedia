import * as mockApi from '@/services/mock-api/glossary';
import { GlossaryTerm, ApiResponse, PaginatedResponse } from '@/types';

/**
 * @fileOverview Abstraction layer for glossary-related data fetching.
 */

export const glossaryService = {
  async getTerms(page?: number, limit?: number): Promise<PaginatedResponse<GlossaryTerm>> {
    try {
      return await mockApi.getTerms(page, limit);
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Glossary service unavailable',
        pagination: {
          currentPage: 1,
          totalPages: 0,
          pageSize: limit || 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
  },

  async getTermBySlug(slug: string): Promise<ApiResponse<GlossaryTerm | null>> {
    try {
      return await mockApi.getTermBySlug(slug);
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: 'Glossary term retrieval failed',
      };
    }
  },
};
