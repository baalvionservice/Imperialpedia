import * as mockApi from '@/services/mock-api/user-dashboard';
import { ApiResponse, UserAlertsAndNotificationsData } from '@/types';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for personalized user dashboard data with error handling.
 */

export const dashboardService = {
  async getAlertsAndNotifications(): Promise<ApiResponse<UserAlertsAndNotificationsData | null>> {
    try {
      return await mockApi.getMockUserAlertsAndNotifications();
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
