import { useQuery } from '@tanstack/react-query';
import { fetchCities, fetchApartmentTypes, fetchPriceRanges, fetchAllFilterOptions, fetchAppConfig } from '@/services/filtersService';
import { cities as fallbackCities, apartmentTypes as fallbackTypes, priceRanges as fallbackPrices } from '@/data/listings';

// Hook to fetch cities
export const useCities = () => {
  return useQuery({
    queryKey: ['filters', 'cities'],
    queryFn: fetchCities,
    staleTime: 10 * 60 * 1000, // 10 minutes - filter options don't change often
    placeholderData: fallbackCities,
  });
};

// Hook to fetch apartment types
export const useApartmentTypes = () => {
  return useQuery({
    queryKey: ['filters', 'apartmentTypes'],
    queryFn: fetchApartmentTypes,
    staleTime: 10 * 60 * 1000,
    placeholderData: fallbackTypes,
  });
};

// Hook to fetch price ranges
export const usePriceRanges = () => {
  return useQuery({
    queryKey: ['filters', 'priceRanges'],
    queryFn: fetchPriceRanges,
    staleTime: 10 * 60 * 1000,
    placeholderData: fallbackPrices,
  });
};

// Hook to fetch all filter options at once
export const useAllFilterOptions = () => {
  return useQuery({
    queryKey: ['filters', 'all'],
    queryFn: fetchAllFilterOptions,
    staleTime: 10 * 60 * 1000,
    placeholderData: {
      cities: fallbackCities,
      apartmentTypes: fallbackTypes,
      priceRanges: fallbackPrices,
    },
  });
};

// Hook to fetch app configuration
export const useAppConfig = () => {
  return useQuery({
    queryKey: ['appConfig'],
    queryFn: fetchAppConfig,
    staleTime: 10 * 60 * 1000,
  });
};
