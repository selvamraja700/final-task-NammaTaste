// src/firebase/config.js
// All credentials come from .env — never hardcode these values.
// Initialization is conditional: if keys are missing, Firebase features are disabled gracefully.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Check if Firebase is enabled (toggle) AND configured (API key present)
export const isFirebaseConfigured =
  import.meta.env.VITE_ENABLE_FIREBASE === 'true' && !!firebaseConfig.apiKey;

let app = null;
let auth = null;
let db = null;
let analytics = null;

if (isFirebaseConfigured) {
  // Prevent double initialization in dev (React StrictMode / HMR)
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db   = getFirestore(app);

  // Analytics is not supported in all environments (SSR, old browsers)
  analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
} else if (import.meta.env.DEV) {
  console.warn(
    '[NammaTaste] Firebase not configured — fill in VITE_FIREBASE_* keys in .env to enable admin dashboard & analytics.'
  );
}

export { app, auth, db, analytics };
export default app;
