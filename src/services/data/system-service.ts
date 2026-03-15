import * as mockApi from '@/services/mock-api/system';
import { ApiResponse } from '@/types';
import { SystemSettings } from '@/types/system';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for platform configuration data with error handling.
 */

export const systemService = {
  async getSettings(): Promise<ApiResponse<SystemSettings | null>> {
    try {
      return await mockApi.getSystemSettings();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async updateSettings(settings: SystemSettings): Promise<ApiResponse<SystemSettings | null>> {
    try {
      return await mockApi.updateSystemSettings(settings);
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
