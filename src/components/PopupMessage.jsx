import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

const PopupMessage = ({ openInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ── Non-intrusive popup strategy ──
    // 1. Show a small toast 8 seconds after page load (gives user time to orient)
    // 2. Auto-dismiss after 12 seconds if user doesn't interact
    // 3. Re-show every 5 minutes for gentle recurring reminder
    const INITIAL_DELAY = 8000;       // 8s after page load
    const AUTO_DISMISS  = 12000;      // auto-hide after 12s
    const RECUR_INTERVAL = 5 * 60 * 1000; // re-show every 5 min

    let dismissTimer;
    let recurTimer;

    const showPopup = () => {
      setIsVisible(true);
      // Auto-dismiss after AUTO_DISMISS ms
      dismissTimer = setTimeout(() => setIsVisible(false), AUTO_DISMISS);
    };

    // Initial show
    const initialTimer = setTimeout(() => {
      showPopup();
      // Recurring show
      recurTimer = setInterval(showPopup, RECUR_INTERVAL);
    }, INITIAL_DELAY);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(dismissTimer);
      if (recurTimer) clearInterval(recurTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleBookNow = () => {
    setIsVisible(false);
    openInquiry();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="fixed top-[140px] md:top-[160px] right-3 md:right-6 lg:right-10 z-[999] pointer-events-auto"
        >
          {/* Compact toast-style popup — deliberately small & non-intrusive */}
          <div className="flex items-center gap-3 bg-[#111111]/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(251,191,36,0.08)] max-w-[320px] sm:max-w-[340px]">
            {/* Icon */}
            <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0 ring-1 ring-amber-500/20">
              <FaCalendarAlt size={14} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold leading-tight mb-0.5 truncate">Planning an Event?</p>
              <button
                onClick={handleBookNow}
                className="text-amber-400 text-[11px] font-bold hover:text-amber-300 transition-colors tracking-wide uppercase"
              >
                Book Now →
              </button>
            </div>

            {/* Close */}
            <button
              onClick={handleDismiss}
              className="text-gray-500 hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 shrink-0"
              aria-label="Dismiss"
            >
              <FaTimes size={10} />
            </button>
          </div>

          {/* Subtle progress bar for auto-dismiss */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 12, ease: 'linear' }}
            className="h-[2px] bg-gradient-to-r from-amber-400/60 to-orange-500/40 rounded-full mt-1 mx-2 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupMessage;
