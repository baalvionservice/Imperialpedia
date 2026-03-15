import * as mockApi from '@/services/mock-api/creators';
import { CreatorProfile, ApiResponse } from '@/types';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for creator-related data fetching with error handling.
 */

export const creatorsService = {
  async getCreators(): Promise<ApiResponse<CreatorProfile[]>> {
    try {
      return await mockApi.getCreators();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getCreatorByUsername(username: string): Promise<ApiResponse<CreatorProfile | null>> {
    try {
      return await mockApi.getCreatorByUsername(username);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },
};
