// Shared React hook for API calls
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { ApiResponse } from '../types';

export function useApi<T>(endpoint: string, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    
    const response = await apiClient.get<T>(endpoint);
    
    if (response.success && response.data) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch data');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [endpoint, immediate]);

  return { data, loading, error, refetch: execute };
}

export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    endpoint: string, 
    payload?: P, 
    method: 'POST' | 'PUT' | 'DELETE' = 'POST'
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    let response: ApiResponse<T>;
    
    switch (method) {
      case 'POST':
        response = await apiClient.post<T>(endpoint, payload);
        break;
      case 'PUT':
        response = await apiClient.put<T>(endpoint, payload);
        break;
      case 'DELETE':
        response = await apiClient.delete<T>(endpoint);
        break;
    }

    if (!response.success) {
      setError(response.error || 'Mutation failed');
    }

    setLoading(false);
    return response;
  };

  return { mutate, loading, error };
}