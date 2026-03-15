/**
 * @fileOverview Foundation for the platform's API client.
 * Currently serves as a placeholder for real backend integration.
 */

export const apiClient = {
  get: async <T>(path: string): Promise<T> => {
    // In the future, this will use fetch() to reach your real API
    console.log(`API Client GET: ${path}`);
    throw new Error('Real API not implemented. Use mockApi for now.');
  },
  post: async <T>(path: string, data: any): Promise<T> => {
    console.log(`API Client POST: ${path}`, data);
    throw new Error('Real API not implemented. Use mockApi for now.');
  },
};
