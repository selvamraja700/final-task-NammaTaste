import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navLinks } from '../data';
import { LOGO_URL, MARQUEE_MESSAGES } from '../utils/helpers';
import { useMarquee } from '../utils/hooks';
import PopupMessage from './PopupMessage';

const NavLink = ({ link, onClick }) => {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(underlineRef.current, { scaleX: 1, transformOrigin: 'left center', duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power2.in' });
  };

  return (
    <a
      ref={linkRef}
      href={link.href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative text-sm font-semibold text-gray-300 hover:text-amber-400 transition-colors flex items-center h-full px-2"
    >
      {link.name}
      <div
        ref={underlineRef}
        className="absolute bottom-[20%] left-0 w-full h-[2px] bg-amber-400 scale-x-0"
      />
    </a>
  );
};

const Header = ({ mobileMenuOpen, setMobileMenuOpen, openInquiry }) => {
  const { index: marqueeIndex, direction: marqueeDirection } = useMarquee(MARQUEE_MESSAGES, 5000);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Mobile Menu Scroll Lock ───
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Senior Engineering Fix: Isolated Compositing Layer */}
      <div 
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300`}
        style={{ 
          isolation: 'isolate',
          contain: 'layout style',
          transform: 'translateZ(0)', // Force GPU Compositing Layer
          willChange: 'transform'
        }}
      >
        <nav 
          className={`w-full flex justify-between items-center px-6 md:px-16 lg:px-24 transition-all duration-500 overflow-hidden border-b border-white/5 ${scrolled ? 'h-16 md:h-20 bg-[#000000]' : 'h-20 md:h-28 bg-[#050505]'}`}
          style={{ 
            boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.7)' : 'none',
            // Using extremely subtle blur only for modern depth, safely contained
            backdropFilter: 'blur(4px)', 
            WebkitBackdropFilter: 'blur(4px)'
          }}
        >
          {/* Logo Section - Optimized for zero-bleed rendering */}
          <a href="#home" className="flex items-center gap-4 active:scale-95 transition-transform group relative">
            <div className="relative shrink-0 overflow-hidden rounded-full">
              <img src={LOGO_URL} alt="Logo" className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all duration-300" loading="eager" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-heading font-black text-white tracking-tighter leading-none">NAMMA TASTE</span>
              <span className="text-[10px] md:text-xs font-bold text-amber-500 tracking-[0.3em] uppercase mt-1">Premium Street Food</span>
            </div>
          </a>
          
          {/* Desktop Nav Links - Standard Engineering Layout */}
          <div className="hidden lg:flex gap-10 items-center h-full">
            {navLinks.map(link => (
              <NavLink key={link.id} link={link} />
            ))}
          </div>
          
          {/* Desktop CTA & Hamburger - High Performance Interactions */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:block relative">
              <button 
                onClick={() => openInquiry()} 
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg active:scale-95"
              >
                Book Event
              </button>
            </div>
            
            {/* Mobile hamburger - High-Contrast Professional Target */}
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden text-white text-3xl focus:outline-none w-[56px] h-[56px] flex justify-center items-center rounded-2xl bg-white/5 border border-white/10 active:scale-90 transition-all"
              aria-label="Open Menu"
            >
              <FaBars />
            </button>
          </div>

          {/* Contextual Popup Notification */}
          <PopupMessage openInquiry={openInquiry} />
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-[#0f0f0f]/60 backdrop-blur-md pointer-events-auto"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="w-4/5 max-w-sm h-full glass-panel border-l border-white/10 p-6 sm:p-8 flex flex-col bg-[#0f0f0f]/90" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-heading font-bold text-amber-400">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white w-[48px] h-[48px] flex justify-center items-center rounded-full active:bg-white/10 transition-colors"><FaTimes size={24} /></button>
              </div>
              <ul className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white hover:text-amber-400 text-lg md:text-xl font-medium transition-colors flex items-center w-full min-h-[48px] px-4 rounded-xl active:bg-white/5">
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="mt-6">
                  <button onClick={() => { setMobileMenuOpen(false); openInquiry(); }} className="w-full btn-primary min-h-[56px] text-lg flex items-center justify-center">Book Event</button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Floating Announcement - No Background Strip */}
      <div className="relative z-30 py-4 mt-20 md:mt-28 pointer-events-none">
        <div className="container mx-auto px-4 overflow-hidden relative h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={marqueeIndex}
              initial={marqueeDirection === 'enter' ? { y: 15, opacity: 0 } : { y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute left-0 top-0 w-full text-center text-amber-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase pointer-events-auto"
              style={{ 
                willChange: 'transform, opacity',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)' // Subtle shadow for legibility on dynamic backgrounds
              }}
            >
              ✦ {MARQUEE_MESSAGES[marqueeIndex]} ✦
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Header;
