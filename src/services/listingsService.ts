import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Listing, Broker } from '@/data/listings';

// Collection references
const listingsCollection = collection(db, 'listings');
const brokersCollection = collection(db, 'brokers');

// Transform Firestore document to Listing type
const transformListing = async (docData: DocumentData, id: string): Promise<Listing> => {
  // Fetch broker data if brokerId exists
  let broker: Broker | null = null;
  if (docData.brokerId) {
    const brokerDoc = await getDoc(doc(db, 'brokers', docData.brokerId));
    if (brokerDoc.exists()) {
      const brokerData = brokerDoc.data();
      broker = {
        id: brokerDoc.id,
        name: brokerData.name,
        photo: brokerData.photo,
        verified: brokerData.verified,
        rating: brokerData.rating,
        listings: brokerData.listings
      };
    }
  }

  return {
    id,
    title: docData.title,
    location: docData.location,
    city: docData.city,
    price: docData.price,
    bedrooms: docData.bedrooms,
    bathrooms: docData.bathrooms,
    size: docData.size,
    type: docData.type,
    videoUrl: docData.videoUrl,
    thumbnailUrl: docData.thumbnailUrl,
    broker: broker || docData.broker,
    likes: docData.likes || 0,
    saved: docData.saved || false,
    featured: docData.featured || false
  };
};

// Fetch all listings
export const fetchListings = async (): Promise<Listing[]> => {
  try {
    const querySnapshot = await getDocs(listingsCollection);
    const listings = await Promise.all(
      querySnapshot.docs.map(doc => transformListing(doc.data(), doc.id))
    );
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

// Fetch listings with filters
export const fetchFilteredListings = async (
  city?: string,
  priceRange?: string,
  type?: string
): Promise<Listing[]> => {
  try {
    const constraints: QueryConstraint[] = [];

    if (city && city !== 'All Cities') {
      constraints.push(where('city', '==', city));
    }

    if (type && type !== 'All Types') {
      constraints.push(where('type', '==', type.toLowerCase()));
    }

    const q = constraints.length > 0 
      ? query(listingsCollection, ...constraints)
      : query(listingsCollection);

    const querySnapshot = await getDocs(q);
    let listings = await Promise.all(
      querySnapshot.docs.map(doc => transformListing(doc.data(), doc.id))
    );

    // Filter by price range (done client-side due to Firestore limitations)
    if (priceRange && priceRange !== 'Any Price') {
      listings = listings.filter(listing => {
        switch (priceRange) {
          case '$0 - $3,000':
            return listing.price <= 3000;
          case '$3,000 - $5,000':
            return listing.price > 3000 && listing.price <= 5000;
          case '$5,000 - $8,000':
            return listing.price > 5000 && listing.price <= 8000;
          case '$8,000+':
            return listing.price > 8000;
          default:
            return true;
        }
      });
    }

    return listings;
  } catch (error) {
    console.error('Error fetching filtered listings:', error);
    return [];
  }
};

// Fetch featured listings
export const fetchFeaturedListings = async (limitCount = 5): Promise<Listing[]> => {
  try {
    const q = query(
      listingsCollection,
      where('featured', '==', true),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const listings = await Promise.all(
      querySnapshot.docs.map(doc => transformListing(doc.data(), doc.id))
    );
    return listings;
  } catch (error) {
    console.error('Error fetching featured listings:', error);
    return [];
  }
};

// Fetch single listing by ID
export const fetchListingById = async (listingId: string): Promise<Listing | null> => {
  try {
    const docRef = doc(db, 'listings', listingId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return transformListing(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
};
