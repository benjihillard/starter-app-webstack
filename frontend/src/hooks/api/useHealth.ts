import { useQuery } from '@tanstack/react-query';

export interface HealthResponse {
  status: string;
  database: string;
}

const fetchHealth = async (): Promise<HealthResponse> => {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Failed to fetch health status');
  }
  return response.json();
};

export const useHealth = () =>
  useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });
