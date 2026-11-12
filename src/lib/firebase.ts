import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'] as const;
const missingConfigKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

if (missingConfigKeys.length > 0) {
  throw new Error(
    `Missing Firebase configuration: ${missingConfigKeys.join(', ')}. ` +
    'Fill in the VITE_FIREBASE_* values in .env and restart the dev server.'
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics only if supported and not blocked
let analytics = null;
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