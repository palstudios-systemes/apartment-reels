import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Broker } from '@/data/listings';

const brokersCollection = collection(db, 'brokers');

// Fetch all brokers
export const fetchBrokers = async (): Promise<Broker[]> => {
  try {
    const querySnapshot = await getDocs(brokersCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      photo: doc.data().photo,
      verified: doc.data().verified,
      rating: doc.data().rating,
      listings: doc.data().listings
    }));
  } catch (error) {
    console.error('Error fetching brokers:', error);
    return [];
  }
};

// Fetch single broker by ID
export const fetchBrokerById = async (brokerId: string): Promise<Broker | null> => {
  try {
    const docRef = doc(db, 'brokers', brokerId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        photo: data.photo,
        verified: data.verified,
        rating: data.rating,
        listings: data.listings
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching broker:', error);
    return null;
  }
};

// Fetch verified brokers
export const fetchVerifiedBrokers = async (): Promise<Broker[]> => {
  try {
    const q = query(
      brokersCollection,
      where('verified', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      photo: doc.data().photo,
      verified: doc.data().verified,
      rating: doc.data().rating,
      listings: doc.data().listings
    }));
  } catch (error) {
    console.error('Error fetching verified brokers:', error);
    return [];
  }
};

// Fetch top rated brokers
export const fetchTopBrokers = async (limitCount = 10): Promise<Broker[]> => {
  try {
    const q = query(
      brokersCollection,
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      photo: doc.data().photo,
      verified: doc.data().verified,
      rating: doc.data().rating,
      listings: doc.data().listings
    }));
  } catch (error) {
    console.error('Error fetching top brokers:', error);
    return [];
  }
};
