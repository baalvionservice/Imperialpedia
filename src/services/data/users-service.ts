import * as mockApi from '@/services/mock-api/users';
import * as roleApi from '@/services/mock-api/roles';
import { User, RoleDefinition, ApiResponse } from '@/types';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for user and role related data fetching with error handling.
 */

export const usersService = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      return await mockApi.getUsers();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },

  async getRoles(): Promise<ApiResponse<RoleDefinition[]>> {
    try {
      return await roleApi.getRoles();
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
