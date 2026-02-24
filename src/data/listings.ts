export interface Broker {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  rating: number;
  listings: number;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  currency?: string;
  phone?: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: 'apartment' | 'studio' | 'penthouse' | 'loft';
  videoUrl: string;
  thumbnailUrl: string;
  broker: Broker;
  likes: number;
  saved: boolean;
  featured: boolean;
}

export const brokers: Broker[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.9,
    listings: 47,
  },
  {
    id: '2',
    name: 'James Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.8,
    listings: 62,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 5.0,
    listings: 35,
  },
  {
    id: '4',
    name: 'Michael Foster',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    rating: 4.7,
    listings: 89,
  },
];

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Luxury Downtown Penthouse',
    location: '432 Park Avenue, Manhattan',
    city: 'New York',
    price: 8500,
    bedrooms: 3,
    bathrooms: 2,
    size: 2200,
    type: 'penthouse',
    videoUrl: 'https://videos.pexels.com/video-files/2098989/2098989-sd_640_360_30fps.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    broker: brokers[0],
    likes: 342,
    saved: false,
    featured: true,
  },
  {
    id: '2',
    title: 'Modern Waterfront Studio',
    location: '88 Marina Boulevard, South Beach',
    city: 'Miami',
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    size: 850,
    type: 'studio',
    videoUrl: 'https://videos.pexels.com/video-files/3773486/3773486-sd_640_360_25fps.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    broker: brokers[1],
    likes: 189,
    saved: true,
    featured: false,
  },
  {
    id: '3',
    title: 'Artistic SoHo Loft',
    location: '156 Spring Street, SoHo',
    city: 'New York',
    price: 5800,
    bedrooms: 2,
    bathrooms: 2,
    size: 1800,
    type: 'loft',
    videoUrl: 'https://videos.pexels.com/video-files/2635537/2635537-sd_640_360_24fps.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    broker: brokers[2],
    likes: 256,
    saved: false,
    featured: true,
  },
  {
    id: '4',
    title: 'Sunny Beachside Apartment',
    location: '2100 Ocean Drive, Venice Beach',
    city: 'Los Angeles',
    price: 4500,
    bedrooms: 2,
    bathrooms: 1,
    size: 1200,
    type: 'apartment',
    videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    broker: brokers[3],
    likes: 421,
    saved: false,
    featured: false,
  },
  {
    id: '5',
    title: 'Chic Urban Apartment',
    location: '789 Market Street, Financial District',
    city: 'San Francisco',
    price: 4200,
    bedrooms: 2,
    bathrooms: 2,
    size: 1100,
    type: 'apartment',
    videoUrl: 'https://videos.pexels.com/video-files/3773486/3773486-sd_640_360_25fps.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    broker: brokers[0],
    likes: 178,
    saved: false,
    featured: false,
  },
  {
    id: '6',
    title: 'Designer Penthouse Suite',
    location: '1 Central Park West, Upper West Side',
    city: 'New York',
    price: 12000,
    bedrooms: 4,
    bathrooms: 3,
    size: 3500,
    type: 'penthouse',
    videoUrl: 'https://videos.pexels.com/video-files/2098989/2098989-sd_640_360_30fps.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    broker: brokers[1],
    likes: 567,
    saved: true,
    featured: true,
  },
];

export const cities = ['All Cities', 'New York', 'Miami', 'Los Angeles', 'San Francisco'];
export const priceRanges = ['Any Price', '$0 - $3,000', '$3,000 - $5,000', '$5,000 - $8,000', '$8,000+'];
export const apartmentTypes = ['All Types', 'Apartment', 'Studio', 'Penthouse', 'Loft'];
