// src/contexts/AuthContext.jsx
// Provides Firebase auth state across the entire app.
// If Firebase is disabled (VITE_ENABLE_FIREBASE=false), auth features are skipped entirely.

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';

const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      return Promise.reject(new Error('Firebase is not configured. Set VITE_ENABLE_FIREBASE=true and fill in keys in .env'));
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    if (!isFirebaseConfigured || !auth) return Promise.resolve();
    return signOut(auth);
  };

  const isAdmin = !!currentUser && currentUser.uid === ADMIN_UID;

  const value = { currentUser, isAdmin, login, logout, loading, isFirebaseConfigured };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
