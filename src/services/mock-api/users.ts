import { User, ApiResponse } from '@/types';

/**
 * @fileOverview Mock service for managing CMS user accounts and roles.
 */

export const mockUsers: User[] = [
  { id: 'u-1', name: 'Eleanor Vance', email: 'eleanor@imperialpedia.com', role: 'admin' },
  { id: 'u-2', name: 'The Market Maven', email: 'maven@imperialpedia.com', role: 'writer' },
  { id: 'u-3', name: 'Expert Editor', email: 'editor@imperialpedia.com', role: 'editor' },
  { id: 'u-4', name: 'Wealth Builder', email: 'wealth@imperialpedia.com', role: 'writer' },
  { id: 'u-5', name: 'Platform Lead', email: 'lead@imperialpedia.com', role: 'admin' },
];

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockUsers,
    status: 200,
  };
};
