import * as mockApi from '@/services/mock-api/premium';
import { ApiResponse, SubscriptionTier, PremiumState } from '@/types';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for subscription and billing data with error handling.
 */

export const premiumService = {
  async getTiers(): Promise<ApiResponse<SubscriptionTier[]>> {
    try {
      return await mockApi.getSubscriptionTiers();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getPremiumState(): Promise<ApiResponse<PremiumState | null>> {
    try {
      return await mockApi.getPremiumState();
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
