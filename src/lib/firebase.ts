import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAATHSpI_caOPNQTeHvHFv0wPgwyd9_EOE",
  authDomain: "bhashamitra-a6d5a.firebaseapp.com",
  projectId: "bhashamitra-a6d5a",
  storageBucket: "bhashamitra-a6d5a.firebasestorage.app",
  messagingSenderId: "800521249086",
  appId: "1:800521249086:web:ce637111855a2d8a8a8c6f",
  measurementId: "G-MFNNQBSD6V"
};

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