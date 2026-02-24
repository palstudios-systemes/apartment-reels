import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, Share2, MessageCircle, BadgeCheck, Volume2, VolumeX, ChevronUp, ChevronDown, SlidersHorizontal, Download, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Listing } from '@/data/listings';
import logo from '@/assets/logo.jpg';

interface ShortsFeedProps {
  listings: Listing[];
  onContact: (listing: Listing) => void;
  onFilterClick: () => void;
  hasFilters: boolean;
}

interface ShortsCardProps {
  listing: Listing;
  isActive: boolean;
  onContact: (listing: Listing) => void;
  onViewDetails: (listing: Listing) => void;
  onFollow: () => void;
}

const ShortsCard = ({ listing, isActive, onContact, onFollow }: Omit<ShortsCardProps, 'onViewDetails'>) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(listing.saved);
  const [likeCount, setLikeCount] = useState(listing.likes);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      await navigator.share({
        title: listing.title,
        text: `Check out this ${listing.type} in ${listing.city}`,
        url: window.location.href,
      });
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (listing.phone) {
      const digits = listing.phone.replace(/\D/g, '');
      window.open(`https://wa.me/${digits}`, '_blank');
    }
  };

  const formatPrice = (price: number, currency?: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(price);
    return currency ? `${currency} ${formatted}` : formatted;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div
      className="relative w-full h-full bg-black"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={listing.videoUrl}
        poster={listing.thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-transform active:scale-95"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-10">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 transition-transform active:scale-95"
        >
          <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ${isLiked ? 'bg-red-500/30' : ''}`}>
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs font-semibold">{formatNumber(likeCount)}</span>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex flex-col items-center gap-1 transition-transform active:scale-95"
        >
          <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ${isSaved ? 'bg-primary/30' : ''}`}>
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs font-semibold">Save</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 transition-transform active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-semibold">Share</span>
        </button>

        {/* Contact */}
        <button
          onClick={handleContact}
          className="flex flex-col items-center gap-1 transition-transform active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-white text-xs font-semibold">Contact</span>
        </button>

        {/* Broker Avatar */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-2 relative"
        >
          <Avatar className="w-12 h-12 border-2 border-white">
            <AvatarImage src={listing.broker.photo} alt={listing.broker.name} />
            <AvatarFallback>{listing.broker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {listing.broker.verified && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-verified rounded-full flex items-center justify-center border-2 border-black">
              <BadgeCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-6 left-4 right-20 z-10">
        {/* Broker Name */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-semibold">@{listing.broker.name.replace(/\s+/g, '')}</span>
          {listing.broker.verified && <BadgeCheck className="w-4 h-4 text-verified" />}
          <button
            onClick={(e) => { e.stopPropagation(); onFollow(); }}
            className="ml-2 px-3 py-1 bg-white rounded-full text-black text-xs font-semibold"
          >
            Follow
          </button>
        </div>

        {/* Price */}
        <p className="text-3xl font-bold text-white mb-2">
          {formatPrice(listing.price, listing.currency)}<span className="text-base font-normal opacity-80">/mo</span>
        </p>

        {/* Title and Location */}
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
          {listing.title}
        </h3>
        <p className="text-sm text-white/80 mb-2 line-clamp-1">
          {listing.location}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-sm text-white/90">
          <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            {listing.bedrooms} Bed
          </span>
          <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            {listing.bathrooms} Bath
          </span>
          <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            {listing.size.toLocaleString()} ft²
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
};

const ShortsFeed = ({ listings, onContact, onFilterClick, hasFilters }: ShortsFeedProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [hasShownScrollModal, setHasShownScrollModal] = useState(false);

  // Show modal after scrolling past 4 reels
  useEffect(() => {
    if (activeIndex >= 4 && !hasShownScrollModal) {
      setShowDownloadModal(true);
      setHasShownScrollModal(true);
    }
  }, [activeIndex, hasShownScrollModal]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < listings.length && !isScrolling) {
      setIsScrolling(true);
      setActiveIndex(index);
      setTimeout(() => setIsScrolling(false), 500);
    }
  }, [listings.length, isScrolling]);

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Handle wheel scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    const threshold = 50;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (Math.abs(accumulatedDelta) > threshold) {
        if (accumulatedDelta > 0) {
          goNext();
        } else {
          goPrev();
        }
        accumulatedDelta = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  // Handle touch swipe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        goNext();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Feed Container - Centered on desktop */}
      <div className="relative w-full h-full md:w-[400px] md:h-[calc(100vh-48px)] md:rounded-2xl md:overflow-hidden md:shadow-2xl">
        {/* Logo and App Name */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          <img src={logo} alt="Cribb Logo" className="w-8 h-8 rounded-lg bg-white p-1" />
          <span className="text-white font-bold text-lg drop-shadow-lg">Cribb</span>
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilterClick}
          className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium transition-transform active:scale-95 hover:bg-white/30"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </button>

        {/* Navigation Hints */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 z-20 flex flex-col items-center gap-1">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${activeIndex === 0 ? 'opacity-30' : 'opacity-70 hover:opacity-100'}`}
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20">
          <button
            onClick={goNext}
            disabled={activeIndex === listings.length - 1}
            className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${activeIndex === listings.length - 1 ? 'opacity-30' : 'opacity-70 hover:opacity-100'}`}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1">
          {listings.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1 rounded-full transition-all ${index === activeIndex
                ? 'h-6 bg-white'
                : 'h-2 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <ShortsCard
              listing={listings[activeIndex]}
              isActive={true}
              onContact={onContact}
              onFollow={() => setShowDownloadModal(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Download Modal - Positioned within the video container */}
      {showDownloadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-[calc(100%-2rem)] max-w-[320px] overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50/50 to-primary/10" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />

            {/* Content */}
            <div className="relative p-6">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              <div className="text-center pt-2">
                <h2 className="text-xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Download the App
                </h2>
              </div>

              <div className="flex flex-col items-center gap-4 py-6">
                {/* Animated icon with gradient ring */}
                <motion.div
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(200, 153, 13, 0.3)", "0 0 0 12px rgba(200, 153, 13, 0)", "0 0 0 0 rgba(200, 153, 13, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-amber-100 flex items-center justify-center"
                >
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-amber-50" />
                  <Download className="relative w-7 h-7 text-primary" />
                </motion.div>

                <p className="text-center text-sm text-muted-foreground max-w-[200px]">
                  Get the full experience with our mobile app
                </p>

                {/* Gradient buttons */}
                <div className="flex gap-3 mt-2 w-full">
                  <motion.a
                    href="https://apps.apple.com/in/app/cribb/id6744996246"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-200 text-sm shadow-lg shadow-gray-900/25 text-center"
                  >
                    App Store
                  </motion.a>
                  <motion.a
                    href="https://play.google.com/store/apps/details?id=com.rhe.cribb&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-amber-500 text-white rounded-xl font-semibold hover:from-primary/90 hover:to-amber-400 transition-all duration-200 text-sm shadow-lg shadow-primary/25 text-center"
                  >
                    Play Store
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ShortsFeed;
