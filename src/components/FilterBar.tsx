import { motion } from 'framer-motion';
import { MapPin, DollarSign, Home, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cities, priceRanges, apartmentTypes } from '@/data/listings';

interface FilterBarProps {
  selectedCity: string;
  selectedPrice: string;
  selectedType: string;
  onCityChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onReset: () => void;
}

const FilterBar = ({
  selectedCity,
  selectedPrice,
  selectedType,
  onCityChange,
  onPriceChange,
  onTypeChange,
  onReset,
}: FilterBarProps) => {
  const hasFilters = selectedCity !== 'All Cities' || selectedPrice !== 'Any Price' || selectedType !== 'All Types';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border py-4"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Location Filter */}
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Filter */}
          <Select value={selectedPrice} onValueChange={onPriceChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Price Range" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Type" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {apartmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reset Button */}
          {hasFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
