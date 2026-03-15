import * as mockApi from '@/services/mock-api/calculators';
import { ApiResponse } from '@/types';
import { Calculator } from '@/services/mock-api/calculators';
import { errorHandler } from '@/lib/errors/error-handler';

/**
 * @fileOverview Abstraction layer for calculator-related data fetching with error handling.
 */

export const calculatorsService = {
  async getCalculatorList(): Promise<ApiResponse<Calculator[]>> {
    try {
      return await mockApi.getCalculatorList();
    } catch (error) {
      const appError = errorHandler.handleError(error);
      return {
        data: [],
        status: appError.statusCode,
        error: appError.message,
      };
    }
  },
};
