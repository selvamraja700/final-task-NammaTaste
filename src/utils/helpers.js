export const getTodayDate = () => new Date().toISOString().split('T')[0];
export const getMaxDate = () => {
  const max = new Date();
  max.setFullYear(max.getFullYear() + 2);
  return max.toISOString().split('T')[0];
};

export const LOGO_URL = "https://ik.imagekit.io/Selvamraj700/NammaTaste/WhatsApp%20Image%202026-04-18%20at%202.50.26%20PM.jpeg";
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export const MARQUEE_MESSAGES = [
  "Fresh pani puri made daily", "Best momos in the city", "Refreshing mojitos for all",
  "Crispy French fries loaded", "Hygienic street food", "Fast delivery within 30 mins",
  "Affordable prices guaranteed", "Family friendly atmosphere", "Authentic Tamil Nadu taste",
  "Spicy and tangy flavors", "Cheese lovers paradise"
];

// Smart Navigation Helpers
export const openModalWithHistory = (modalId, urlHash) => {
  // Use replaceState if repeatedly opening the same type of modal to prevent deep stack issues
  if (window.history.state && window.history.state.modal === modalId) {
    window.history.replaceState({ modal: modalId }, '', urlHash);
  } else {
    window.history.pushState({ modal: modalId }, '', urlHash);
  }
};

export const smartBack = (fallbackAction) => {
  if (window.history.state && window.history.state.modal) {
    if (window.history.length > 1) {
      window.history.back(); // Triggers popstate listener
    } else {
      window.history.replaceState(null, '', window.location.pathname);
      if (fallbackAction) fallbackAction();
    }
  } else {
    // If no meaningful history, just execute the fallback (e.g. close modal)
    if (fallbackAction) fallbackAction();
  }
};

// ─── Reviews Visibility Configuration ────────────────────────────────────────
// Set to true to force show the reviews section right now.
// Set to false to hide the reviews section until June 1, 2026.
export const DispalyTestimonials = true;

// Alias to prevent typos
export const DisplayTestimonials = DispalyTestimonials;
