import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities, priceRanges, apartmentTypes } from '@/data/listings';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  selectedPrice: string;
  selectedType: string;
  onCityChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onReset: () => void;
  totalResults: number;
}

const FilterOverlay = ({
  isOpen,
  onClose,
  selectedCity,
  selectedPrice,
  selectedType,
  onCityChange,
  onPriceChange,
  onTypeChange,
  onReset,
  totalResults,
}: FilterOverlayProps) => {
  const hasFilters = selectedCity !== 'All Cities' || selectedPrice !== 'Any Price' || selectedType !== 'All Types';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[85vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 border-b border-border">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-6 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* Location */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Location</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => onCityChange(city)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCity === city
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Price Range</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => onPriceChange(range)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedPrice === range
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apartment Type */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Type</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {apartmentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => onTypeChange(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-border flex items-center gap-3">
              {hasFilters && (
                <Button
                  variant="outline"
                  onClick={onReset}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              )}
              <Button 
                onClick={onClose}
                className="flex-1 bg-primary text-primary-foreground"
              >
                Show {totalResults} {totalResults === 1 ? 'Result' : 'Results'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterOverlay;
