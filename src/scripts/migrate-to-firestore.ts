import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch } from 'firebase/firestore';
import { listings, brokers } from '../data/listings';

// Direct configuration for the script
const firebaseConfig = {
    apiKey: "AIzaSyDbuOF6-KhLPZGhXFQe1vsgPqBrHRdb0R4",
    authDomain: "apartment-reels-main-7ed6b.firebaseapp.com",
    projectId: "apartment-reels-main-7ed6b",
    storageBucket: "apartment-reels-main-7ed6b.firebasestorage.app",
    messagingSenderId: "259506853650",
    appId: "1:259506853650:web:1d9e3a65db8a95cc6145cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
    console.log('Starting migration...');

    try {
        const batch = writeBatch(db);

        // 1. Migrate Brokers
        console.log(`Migrating ${brokers.length} brokers...`);
        for (const broker of brokers) {
            const brokerRef = doc(db, 'brokers', broker.id);
            batch.set(brokerRef, {
                name: broker.name,
                photo: broker.photo,
                verified: broker.verified,
                rating: broker.rating,
                listings: broker.listings
            });
        }

        // 2. Migrate Listings
        console.log(`Migrating ${listings.length} listings...`);
        for (const listing of listings) {
            const listingRef = doc(db, 'listings', listing.id);
            batch.set(listingRef, {
                title: listing.title,
                location: listing.location,
                city: listing.city,
                price: listing.price,
                bedrooms: listing.bedrooms,
                bathrooms: listing.bathrooms,
                size: listing.size,
                type: listing.type,
                videoUrl: listing.videoUrl,
                thumbnailUrl: listing.thumbnailUrl,
                brokerId: listing.broker.id,
                likes: listing.likes,
                saved: listing.saved,
                featured: listing.featured
            });
        }

        await batch.commit();
        console.log('Migration completed successfully! 🎉');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
