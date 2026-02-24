import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, MessageCircle, Play, Pause, BadgeCheck, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Listing } from '@/data/listings';

interface VideoCardProps {
  listing: Listing;
  onContact: (listing: Listing) => void;
  onViewDetails: (listing: Listing) => void;
}

const VideoCard = ({ listing, onContact, onViewDetails }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(listing.saved);
  const [likeCount, setLikeCount] = useState(listing.likes);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: listing.title,
        text: `Check out this ${listing.type} in ${listing.city}`,
        url: window.location.href,
      });
    }
  };

  const formatPrice = (price: number, currency?: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(price);
    return currency ? `${currency} ${formatted}` : formatted;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      {/* Video Container */}
      <div
        className="relative aspect-[9/12] sm:aspect-[9/10] cursor-pointer overflow-hidden"
        onClick={() => onViewDetails(listing)}
      >
        <video
          ref={videoRef}
          src={listing.videoUrl}
          poster={listing.thumbnailUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

        {/* Play/Pause Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Featured Badge */}
        {listing.featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0 shadow-button">
            Featured
          </Badge>
        )}

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          {/* Price */}
          <p className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">
            {formatPrice(listing.price, listing.currency)}<span className="text-sm font-normal opacity-80">/mo</span>
          </p>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-1 line-clamp-1">
            {listing.title}
          </h3>

          {/* Location */}
          <p className="text-sm text-primary-foreground/80 mb-3 line-clamp-1">
            {listing.location}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-primary-foreground/90">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              {listing.size.toLocaleString()} ft²
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 sm:p-5">
        {/* Broker Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary/20">
              <AvatarImage src={listing.broker.photo} alt={listing.broker.name} />
              <AvatarFallback>{listing.broker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm">{listing.broker.name}</span>
                {listing.broker.verified && (
                  <BadgeCheck className="w-4 h-4 text-verified" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{listing.broker.listings} listings</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            ★ {listing.broker.rating}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 gap-2 ${isLiked ? 'text-destructive' : ''}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs">{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`flex-1 gap-2 ${isSaved ? 'text-primary' : ''}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-xs">Save</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex-1 gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs">Share</span>
          </Button>
          <Button
            size="sm"
            onClick={() => onContact(listing)}
            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">Contact</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
