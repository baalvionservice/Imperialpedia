import * as mockApi from '@/services/mock-api/calculators';
import { ApiResponse } from '@/types';
import { Calculator } from '@/services/mock-api/calculators';

/**
 * @fileOverview Abstraction layer for calculator-related data fetching.
 */

export const calculatorsService = {
  async getCalculatorList(): Promise<ApiResponse<Calculator[]>> {
    try {
      return await mockApi.getCalculatorList();
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: 'Calculators service unavailable',
      };
    }
  },
};
