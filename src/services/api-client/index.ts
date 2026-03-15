// Generic API client foundation for the platform
export const apiClient = {
  get: async <T>(path: string): Promise<T> => {
    // Basic fetch implementation placeholder
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${path}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  post: async <T>(path: string, data: any): Promise<T> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
};
