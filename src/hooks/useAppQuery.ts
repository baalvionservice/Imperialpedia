import { apiClient } from "@/services/api-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/types/api";

interface QueryParams {
  endpoint: string;
  queryKey: string[];
  config?: AxiosRequestConfig;
  enabled?: boolean;
}

export const useAppQuery = <TResponse>({
  endpoint,
  queryKey,
  config,
  enabled = true,
}: QueryParams): UseQueryResult<ApiResponse<TResponse>, AxiosError> => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<TResponse>>(
        `/${endpoint}`,
        config
      );
      return response.data;
    },
    enabled,
  });
};
