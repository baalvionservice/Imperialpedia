import * as mockApi from '@/services/mock-api/moderation';
import { ApiResponse, ModerationItem } from '@/types';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for content moderation operations.
 */

export const moderationService = {
  async getModerationQueue(): Promise<ApiResponse<ModerationItem[]>> {
    try {
      return await mockApi.getModerationQueue();
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
