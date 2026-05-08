import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

const PopupMessage = ({ openInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 10 minutes in milliseconds
    const TEN_MINUTES = 10 * 60 * 1000;
    
    let cycleTimer;
    
    const startCycle = () => {
      // Show the popup
      setIsVisible(true);
    };

    // Initial show after 10 minutes
    cycleTimer = setInterval(startCycle, TEN_MINUTES);

    return () => {
      if (cycleTimer) clearInterval(cycleTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute top-full mt-4 right-4 md:right-8 lg:right-12 z-50 glass-panel border border-amber-500/50 p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col gap-4 w-[calc(100vw-2rem)] sm:w-80 pointer-events-auto"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20"
          >
            <FaTimes size={14} />
          </button>
          
          <div className="flex items-center gap-4 pr-6 pt-1">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 ring-1 ring-amber-500/30">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold font-heading text-lg leading-tight mb-1">Planning an Event?</h4>
              <p className="text-gray-400 text-xs md:text-sm">Book Namma Taste today!</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setIsVisible(false);
              openInquiry();
            }}
            className="mt-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-2.5 rounded-xl text-sm transition-colors shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]"
          >
            Book Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupMessage;
