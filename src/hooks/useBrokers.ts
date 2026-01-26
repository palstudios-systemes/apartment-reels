import { useQuery } from '@tanstack/react-query';
import { fetchBrokers, fetchBrokerById, fetchVerifiedBrokers, fetchTopBrokers } from '@/services/brokersService';
import { brokers as fallbackBrokers } from '@/data/listings';

// Hook to fetch all brokers
export const useBrokers = () => {
  return useQuery({
    queryKey: ['brokers'],
    queryFn: fetchBrokers,
    staleTime: 5 * 60 * 1000,
    placeholderData: fallbackBrokers,
  });
};

// Hook to fetch single broker
export const useBroker = (brokerId: string | undefined) => {
  return useQuery({
    queryKey: ['broker', brokerId],
    queryFn: () => fetchBrokerById(brokerId!),
    enabled: !!brokerId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch verified brokers
export const useVerifiedBrokers = () => {
  return useQuery({
    queryKey: ['brokers', 'verified'],
    queryFn: fetchVerifiedBrokers,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch top rated brokers
export const useTopBrokers = (limit = 10) => {
  return useQuery({
    queryKey: ['brokers', 'top', limit],
    queryFn: () => fetchTopBrokers(limit),
    staleTime: 5 * 60 * 1000,
  });
};
