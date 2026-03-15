import * as mockApi from '@/services/mock-api/creators';
import { CreatorProfile, ApiResponse } from '@/types';

/**
 * @fileOverview Abstraction layer for creator-related data fetching.
 */

export const creatorsService = {
  async getCreators(): Promise<ApiResponse<CreatorProfile[]>> {
    try {
      return await mockApi.getCreators();
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Creators service unavailable',
      };
    }
  },

  async getCreatorByUsername(username: string): Promise<ApiResponse<CreatorProfile | null>> {
    try {
      return await mockApi.getCreatorByUsername(username);
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: 'Creator profile retrieval failed',
      };
    }
  },
};
