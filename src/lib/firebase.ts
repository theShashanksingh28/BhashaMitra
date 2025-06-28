import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAATHSpI_caOPNQTeHvHFv0wPgwyd9_EOE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bhashamitra-a6d5a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bhashamitra-a6d5a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bhashamitra-a6d5a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "800521249086",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:800521249086:web:ce637111855a2d8a8a8c6f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MFNNQBSD6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics only if supported and not blocked
let analytics: Analytics | null = null;
isSupported().then(yes => yes && (analytics = getAnalytics(app)))
  .catch(err => console.log('Analytics not supported:', err));

export { analytics };

// Test function to verify Firebase connection
export const testFirebaseConnection = async () => {
  try {
    // Test Firestore connection by trying to get a document
    const testDocRef = doc(db, 'test', 'test');
    await getDoc(testDocRef);
    
    // If we get here, the connection is successful
    console.log('Firebase connection successful!');
    return true;
  } catch (error) {
    // Log the specific error for debugging
    console.error('Firebase connection error:', error);
    
    // Check if it's a permissions error (which is actually good - means we can connect)
    if (error instanceof Error && error.message.includes('permission-denied')) {
      console.log('Firebase connection successful (permission denied is expected for test document)');
      return true;
    }
    
    return false;
  }
};

export default app; 