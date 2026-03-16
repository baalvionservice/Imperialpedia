/**
 * @fileOverview Foundation for the platform's API client.
 * Serves as the primary handshake node for backend services.
 */

export const apiClient = {
  get: async <T>(path: string): Promise<T> => {
    // In the future, this will use fetch() to reach your real API
    throw new Error('Real API not implemented. Use service layer with mock data for current phase.');
  },
  post: async <T>(path: string, data: any): Promise<T> => {
    throw new Error('Real API not implemented. Use service layer with mock data for current phase.');
  },
};
