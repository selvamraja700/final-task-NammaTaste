// src/firebase/analytics.js
// Helper functions to track engagement events into Firestore.
// Call these throughout the app — they write lightweight docs that the Admin Dashboard reads.

import { db } from './config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const METRICS_COLLECTION = 'metrics';

/**
 * Base function — writes an event document to Firestore.
 * All fields are optional; timestamp is always added server-side.
 */
async function writeEvent(eventName, data = {}) {
  try {
    await addDoc(collection(db, METRICS_COLLECTION), {
      event: eventName,
      timestamp: serverTimestamp(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      screenWidth: window.innerWidth,
      ...data,
    });
  } catch (err) {
    // Silently fail — never break the user experience for analytics errors
    if (import.meta.env.DEV) {
      console.warn('[NammaTaste Analytics] Failed to write event:', eventName, err);
    }
  }
}

/**
 * Track a page view — call on app mount.
 * @param {string} pageName  e.g. 'home', 'menu', 'contact'
 */
export function trackPageView(pageName = 'home') {
  return writeEvent('page_view', { page: pageName });
}

/**
 * Track a user session start — call once on app mount.
 * Uses sessionStorage to avoid double-counting within the same tab session.
 */
export function trackSession() {
  if (sessionStorage.getItem('nt_session_tracked')) return;
  sessionStorage.setItem('nt_session_tracked', 'true');
  return writeEvent('session_start', { page: window.location.pathname });
}

/**
 * Track any custom user action.
 * @param {string} eventName  e.g. 'inquiry_submitted', 'menu_viewed', 'cta_clicked'
 * @param {object} data       Any additional key-value metadata
 */
export function trackEvent(eventName, data = {}) {
  return writeEvent(eventName, data);
}
