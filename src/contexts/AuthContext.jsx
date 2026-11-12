import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, name) => {
    setError(null);

    let user;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
    } catch (authError) {
      setError(authError.message);
      throw authError;
    }

    // Profile setup must not fail the signup: the account already exists.
    const now = new Date().toISOString();
    try {
      await updateProfile(user, { displayName: name });
    } catch (profileError) {
      console.warn('Account created, but display name could not be set:', profileError);
    }

    await Promise.allSettled([
      setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: now,
        lastLogin: now,
        preferences: {
          theme: 'light',
          notifications: true
        }
      }),
      setDoc(doc(db, 'userProgress', user.uid), {
        selectedLanguage: '',
        completedLessons: [],
        totalScore: 0,
        lastLogin: now,
        streak: 0,
        dailyGoal: 100,
        weeklyProgress: 0
      }),
      setDoc(doc(db, 'achievements', user.uid), {
        unlocked: [],
        progress: {}
      })
    ]).then((results) => {
      results
        .filter((result) => result.status === 'rejected')
        .forEach((result) => console.warn('Failed to save user data:', result.reason));
    });
  };

  const login = async (email, password) => {
    setError(null);

    let user;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
    } catch (authError) {
      setError(authError.message);
      throw authError;
    }

    // Keep the login successful even if the profile sync fails.
    const now = new Date().toISOString();
    await Promise.allSettled([
      setDoc(doc(db, 'users', user.uid), { lastLogin: now }, { merge: true }),
      setDoc(doc(db, 'userProgress', user.uid), { lastLogin: now }, { merge: true }),
    ]).then((results) => {
      results
        .filter((result) => result.status === 'rejected')
        .forEach((result) => console.warn('Failed to update last login:', result.reason));
    });
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateUserProfile = async (name) => {
    try {
      setError(null);
      if (!currentUser) throw new Error('No user logged in');
      await updateProfile(currentUser, { displayName: name });
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 