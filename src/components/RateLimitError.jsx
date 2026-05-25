import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock } from 'react-icons/fa';

const RateLimitError = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f0f0f]/95 backdrop-blur-md p-4"
      style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel max-w-md w-full p-8 md:p-10 rounded-[2rem] border border-red-500/20 shadow-[0_20px_60px_rgba(239,68,68,0.15)] flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
        
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <FaShieldAlt className="text-4xl text-red-500" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">Too Many Clicks!</h2>
        <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
          You have clicked too many times. Please wait for 1 minute before trying again.
        </p>
        
        <div className="w-full bg-black/50 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <FaClock className="text-amber-400 text-3xl sm:text-2xl" />
          <div className="text-center sm:text-left">
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Cooldown Remaining</div>
            <div className="text-3xl font-mono font-bold text-white tracking-widest">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RateLimitError;
