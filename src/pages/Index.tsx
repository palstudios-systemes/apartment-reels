import { useState } from 'react';
import ShortsFeed from '@/components/ShortsFeed';
import ContactModal from '@/components/ContactModal';
import FilterOverlay from '@/components/FilterOverlay';
import { type Listing } from '@/data/listings';
import { useQuery } from '@tanstack/react-query';
import { fetchFilteredListings } from '@/services/listingsService';

const Index = () => {
  // Filters
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedPrice, setSelectedPrice] = useState('Any Price');
  const [selectedType, setSelectedType] = useState('All Types');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Modals
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fetch listings using React Query
  const { data: listings = [], isLoading, error } = useQuery({
    queryKey: ['listings', selectedCity, selectedPrice, selectedType],
    queryFn: () => fetchFilteredListings(selectedCity, selectedPrice, selectedType),
  });

  const hasFilters = selectedCity !== 'All Cities' || selectedPrice !== 'Any Price' || selectedType !== 'All Types';

  const handleContact = (listing: Listing) => {
    setSelectedListing(listing);
    setIsContactOpen(true);
  };

  const resetFilters = () => {
    setSelectedCity('All Cities');
    setSelectedPrice('Any Price');
    setSelectedType('All Types');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <p className="text-xl mb-4">Error loading listings</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <p className="text-white text-xl">No listings found</p>
        <button
          onClick={resetFilters}
          className="text-primary underline"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <>
      <ShortsFeed
        listings={listings}
        onContact={handleContact}
        onFilterClick={() => setIsFilterOpen(true)}
        hasFilters={hasFilters}
      />

      {/* Modals */}
      <FilterOverlay
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCity={selectedCity}
        selectedPrice={selectedPrice}
        selectedType={selectedType}
        onCityChange={setSelectedCity}
        onPriceChange={setSelectedPrice}
        onTypeChange={setSelectedType}
        onReset={resetFilters}
        totalResults={listings.length}
      />

      <ContactModal
        listing={selectedListing}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};

export default Index;
