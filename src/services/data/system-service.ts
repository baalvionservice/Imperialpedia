import * as mockApi from '@/services/mock-api/system';
import { ApiResponse } from '@/types';
import { SystemSettings, SystemNotification, AdminAlert, SystemHealth } from '@/types/system';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for platform configuration and system messaging.
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
  },

  async getNotifications(): Promise<ApiResponse<SystemNotification[]>> {
    try {
      return await mockApi.getSystemNotifications();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async updateNotification(notification: SystemNotification): Promise<ApiResponse<SystemNotification | null>> {
    try {
      return await mockApi.updateSystemNotification(notification);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    try {
      return await mockApi.deleteSystemNotification(id);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: undefined,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getAlerts(): Promise<ApiResponse<AdminAlert[]>> {
    try {
      return await mockApi.getAdminAlerts();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getSystemHealth(): Promise<ApiResponse<SystemHealth | null>> {
    try {
      return await mockApi.getSystemHealth();
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
