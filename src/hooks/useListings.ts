import { useQuery } from '@tanstack/react-query';
import { fetchListings, fetchFilteredListings, fetchFeaturedListings, fetchListingById } from '@/services/listingsService';
import { listings as fallbackListings } from '@/data/listings';

// Hook to fetch all listings
export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: fallbackListings,
  });
};

// Hook to fetch filtered listings
export const useFilteredListings = (
  city?: string,
  priceRange?: string,
  type?: string
) => {
  return useQuery({
    queryKey: ['listings', 'filtered', city, priceRange, type],
    queryFn: () => fetchFilteredListings(city, priceRange, type),
    staleTime: 5 * 60 * 1000,
    placeholderData: fallbackListings,
  });
};

// Hook to fetch featured listings
export const useFeaturedListings = (limit = 5) => {
  return useQuery({
    queryKey: ['listings', 'featured', limit],
    queryFn: () => fetchFeaturedListings(limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch single listing
export const useListing = (listingId: string | undefined) => {
  return useQuery({
    queryKey: ['listing', listingId],
    queryFn: () => fetchListingById(listingId!),
    enabled: !!listingId,
    staleTime: 5 * 60 * 1000,
  });
};
