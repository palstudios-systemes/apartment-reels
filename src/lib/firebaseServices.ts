// Re-export all Firebase services
export { db, auth, storage } from './firebase';

// Re-export service functions
export { 
  fetchListings, 
  fetchFilteredListings, 
  fetchFeaturedListings, 
  fetchListingById 
} from '@/services/listingsService';

export { 
  fetchBrokers, 
  fetchBrokerById, 
  fetchVerifiedBrokers, 
  fetchTopBrokers 
} from '@/services/brokersService';

export { 
  fetchCities, 
  fetchApartmentTypes, 
  fetchPriceRanges, 
  fetchAllFilterOptions, 
  fetchAppConfig 
} from '@/services/filtersService';
