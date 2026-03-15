import * as mockApi from '@/services/mock-api/system';
import { ApiResponse } from '@/types';
import { SystemSettings, SystemNotification, AdminAlert, SystemHealth, Backup, AccessLog, ErrorLog, FeatureFlag, NotificationLog, PlatformSettings, AdminActivityLog } from '@/types/system';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for platform configuration and system messaging.
 */

export const systemService = {
  async getPlatformSettings(): Promise<ApiResponse<PlatformSettings | null>> {
    try {
      return await mockApi.getPlatformSettings();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async updatePlatformSettings(settings: PlatformSettings): Promise<ApiResponse<PlatformSettings | null>> {
    try {
      return await mockApi.updatePlatformSettings(settings);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

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

  async getNotificationLogs(): Promise<ApiResponse<NotificationLog[]>> {
    try {
      return await mockApi.getNotificationLogs();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
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
  },

  async getBackups(): Promise<ApiResponse<Backup[]>> {
    try {
      return await mockApi.getBackups();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async createBackup(): Promise<ApiResponse<Backup | null>> {
    try {
      return await mockApi.createBackup();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: null,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async restoreBackup(id: string): Promise<ApiResponse<void>> {
    try {
      return await mockApi.restoreBackup(id);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: undefined,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getFeatureFlags(): Promise<ApiResponse<FeatureFlag[]>> {
    try {
      return await mockApi.getFeatureFlags();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async updateFeatureFlag(id: string, enabled: boolean): Promise<ApiResponse<void>> {
    try {
      return await mockApi.updateFeatureFlag(id, enabled);
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: undefined,
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getAccessLogs(): Promise<ApiResponse<AccessLog[]>> {
    try {
      return await mockApi.getAccessLogs();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getErrorLogs(): Promise<ApiResponse<ErrorLog[]>> {
    try {
      return await mockApi.getErrorLogs();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getAdminLogs(): Promise<ApiResponse<AdminActivityLog[]>> {
    try {
      return await mockApi.getAdminLogs();
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
