import { 
  collection, 
  getDocs,
  doc,
  getDoc,
  orderBy,
  query
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Collection references
const citiesCollection = collection(db, 'cities');
const apartmentTypesCollection = collection(db, 'apartmentTypes');
const priceRangesCollection = collection(db, 'priceRanges');

// Fetch cities for filter dropdown
export const fetchCities = async (): Promise<string[]> => {
  try {
    const q = query(citiesCollection, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().name);
  } catch (error) {
    console.error('Error fetching cities:', error);
    // Return default values as fallback
    return ['All Cities', 'New York', 'Miami', 'Los Angeles', 'San Francisco'];
  }
};

// Fetch apartment types for filter dropdown
export const fetchApartmentTypes = async (): Promise<string[]> => {
  try {
    const q = query(apartmentTypesCollection, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().name);
  } catch (error) {
    console.error('Error fetching apartment types:', error);
    // Return default values as fallback
    return ['All Types', 'Apartment', 'Studio', 'Penthouse', 'Loft'];
  }
};

// Fetch price ranges for filter dropdown
export const fetchPriceRanges = async (): Promise<string[]> => {
  try {
    const q = query(priceRangesCollection, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().label);
  } catch (error) {
    console.error('Error fetching price ranges:', error);
    // Return default values as fallback
    return ['Any Price', '$0 - $3,000', '$3,000 - $5,000', '$5,000 - $8,000', '$8,000+'];
  }
};

// Fetch app configuration
export const fetchAppConfig = async (): Promise<{
  appName: string;
  logoUrl: string;
  reelsBeforePrompt: number;
  appStoreUrl: string;
  playStoreUrl: string;
} | null> => {
  try {
    const docRef = doc(db, 'appConfig', 'settings');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as {
        appName: string;
        logoUrl: string;
        reelsBeforePrompt: number;
        appStoreUrl: string;
        playStoreUrl: string;
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching app config:', error);
    return null;
  }
};

// Fetch all filter options at once
export const fetchAllFilterOptions = async (): Promise<{
  cities: string[];
  apartmentTypes: string[];
  priceRanges: string[];
}> => {
  const [cities, apartmentTypes, priceRanges] = await Promise.all([
    fetchCities(),
    fetchApartmentTypes(),
    fetchPriceRanges()
  ]);

  return { cities, apartmentTypes, priceRanges };
};
