import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Bookmark, Share2, MessageCircle, BadgeCheck, Bed, Bath, Square, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Listing } from '@/data/listings';

interface ListingDetailsProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: (listing: Listing) => void;
}

const ListingDetails = ({ listing, isOpen, onClose, onContact }: ListingDetailsProps) => {
  if (!listing) return null;

  const formatPrice = (price: number, currency?: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(price);
    return currency ? `${currency} ${formatted}` : formatted;
  };

  const features = [
    'Central AC',
    'In-Unit Laundry',
    'Hardwood Floors',
    'Stainless Steel Appliances',
    'Floor-to-Ceiling Windows',
    'Walk-in Closet',
    'Balcony',
    'Gym Access',
  ];

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
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-xl bg-card z-50 overflow-y-auto"
          >
            {/* Video Header */}
            <div className="relative aspect-video">
              <video
                src={listing.videoUrl}
                poster={listing.thumbnailUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Price Overlay */}
              <div className="absolute bottom-4 left-4">
                <p className="text-3xl font-bold text-primary-foreground">
                  {formatPrice(listing.price, listing.currency)}<span className="text-base font-normal opacity-80">/mo</span>
                </p>
              </div>

              {listing.featured && (
                <Badge className="absolute bottom-4 right-4 bg-primary text-primary-foreground border-0">
                  Featured
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title & Location */}
              <div>
                <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-xl">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">{listing.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">{listing.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">{listing.size.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Sq. Ft.</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  About this {listing.type}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience luxury living in this stunning {listing.type} located in the heart of {listing.city}.
                  This meticulously designed space features modern finishes, abundant natural light, and
                  breathtaking views. Perfect for professionals or couples seeking an elevated urban lifestyle.
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Amenities & Features</h3>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Available Now</p>
                  <p className="text-sm text-muted-foreground">Move-in ready with flexible lease terms</p>
                </div>
              </div>

              {/* Broker Card */}
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={listing.broker.photo} alt={listing.broker.name} />
                      <AvatarFallback>{listing.broker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{listing.broker.name}</span>
                        {listing.broker.verified && (
                          <BadgeCheck className="w-4 h-4 text-verified" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {listing.broker.listings} listings • ★ {listing.broker.rating}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Verified Broker
                  </Badge>
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={() => onContact(listing)}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button text-base font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact {listing.broker.name.split(' ')[0]}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ListingDetails;
