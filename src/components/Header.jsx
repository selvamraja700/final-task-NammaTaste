import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navLinks } from '../data';
import { LOGO_URL, MARQUEE_MESSAGES, isReviewsEnabled } from '../utils/helpers';
import { useMarquee } from '../utils/hooks';
import PopupMessage from './PopupMessage';

// ─── Desktop NavLink Component ────────────────────────────────────────────────
// GSAP-driven underline hover — no pointer-events issues, isolated from mobile.
// Smooth-scroll navigation for hash links.
const NavLink = ({ link, onClick }) => {
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(underlineRef.current, { scaleX: 1, transformOrigin: 'left center', duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power2.in' });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      href={link.href}
      onClick={handleClick}
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

// ─── Header Component ─────────────────────────────────────────────────────────
const Header = ({ mobileMenuOpen, setMobileMenuOpen, openInquiry }) => {
  const { index: marqueeIndex, direction: marqueeDirection } = useMarquee(MARQUEE_MESSAGES, 5000);
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerGlow, setHamburgerGlow] = useState(true);
  const [bookButtonGlow, setBookButtonGlow] = useState(false);

  const showReviews = isReviewsEnabled();
  const filteredNavLinks = showReviews 
    ? navLinks 
    : navLinks.filter(link => link.name !== 'Reviews');

  // ─── Scroll State ───
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Guided User Flow: Phase 1 → Hamburger glow, Phase 2 → CTA glow ───
  // Only transition when menu is first opened — no stale state risk.
  useEffect(() => {
    if (mobileMenuOpen) {
      setHamburgerGlow(false);
      setBookButtonGlow(true);
    }
  }, [mobileMenuOpen]);

  // ─── Body Scroll Lock (Mobile Menu) ───────────────────────────────────────
  // ROOT CAUSE FIX: We must NEVER set pointer-events: none on #root.
  // The mobile menu IS a child of #root, so that would kill all menu interactions.
  // Instead, we lock only body overflow + compensate for scrollbar width to prevent layout shift.
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollBarWidth > 0 ? `${scrollBarWidth}px` : '';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileMenuOpen]);

  // ─── Stable toggle handler ──────────────────────────────────────────────────
  // Uses functional updater to prevent stale closure state on rapid clicks.
  const handleHamburgerToggle = () => setMobileMenuOpen(prev => !prev);
  const handleMenuClose = () => setMobileMenuOpen(false);

  return (
    <>
      {/* ── Navbar: GPU-composited, isolated stacking context, z-1000 ── */}
      {/*
        NOTE: contain: 'layout style' was removed — it created a containing block
        that interfered with fixed-position PopupMessage children.
        GPU compositing is retained via translateZ(0) + willChange.
      */}
      <div
        className="fixed top-0 left-0 w-full z-[1000]"
        style={{
          isolation: 'isolate',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        <nav
            className={`
                w-full flex justify-between items-center 
                px-6 md:px-16 lg:px-24 
                transition-all duration-500 
                ${scrolled ? 'h-16 md:h-20 bg-black/95' : 'h-20 md:h-28 bg-[#050505]/90'}
            `}
          style={{
            boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.8)' : 'none',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 md:gap-4 active:scale-95 transition-transform group">
              <img
                src={LOGO_URL}
                alt="Namma Taste Logo"
                className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full object-cover bg-black"
                loading="eager"
              />

            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-heading font-black text-white tracking-tighter leading-none">
                Namma <span className="text-amber-400">Taste</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-10 items-center h-full">
            {filteredNavLinks.map(link => (
              <NavLink key={link.id} link={link} />
            ))}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop-only CTA */}
            <div className="hidden lg:block">
              <button
                onClick={() => openInquiry()}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg active:scale-95"
              >
                Book Event
              </button>
            </div>

            {/* Hamburger — mobile only, min 44×44px touch target */}
            <button
              onClick={handleHamburgerToggle}
              className={`
                lg:hidden
                w-12 h-12 flex items-center justify-center 
                rounded-full bg-white/5 border border-white/10 
                text-white/70 hover:text-amber-400 
                transition-all active:scale-90
                ${hamburgerGlow ? 'animate-interaction-glow' : ''}
              `}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <FaBars size={20} />
            </button>
          </div>
        </nav>

        {/* ── High-End Bottom Gradient separator (1px fine gold accent line) ── */}
        <div
          className="w-full h-[1px] relative opacity-90"
          style={{
            background: 'linear-gradient(90deg, rgba(251,191,36,0) 0%, rgba(251,191,36,0.2) 20%, rgba(251,191,36,0.5) 50%, rgba(251,191,36,0.2) 80%, rgba(251,191,36,0) 100%)',
            boxShadow: '0 1px 12px rgba(251,191,36,0.15)',
          }}
        />
      </div>

      {/* ── PopupMessage: Fixed independently — does NOT disturb navbar, marquee, or hero ── */}
      <PopupMessage openInquiry={openInquiry} />

      {/* ── Mobile Menu: Right-side Off-Canvas Drawer ──────────────────────
        Architecture:
        - Full-screen overlay container (inset-0) for backdrop tap-to-close
        - Panel is a right-aligned column at 85vw max, slides from x:100% → x:0
        - Content is TOP-ALIGNED (not centered) to eliminate dead space
        - Backdrop on the left half closes the menu on tap
        ROOT CAUSE FIX: Removed justify-center + pt-24 which caused massive
        empty zones by centering content in a full-viewport flex container.
      ─────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1050] lg:hidden flex justify-end"
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Backdrop — tap outside panel to close */}
            <div
              className="absolute inset-0 bg-black/60"
              style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
              onClick={handleMenuClose}
              aria-hidden="true"
            />

            {/* Off-Canvas Panel — slides from right */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="relative w-[45vw] h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col"
              style={{ willChange: 'transform' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Panel Header — Simplified to remove duplicate branding */}
              <div className="flex items-center justify-end px-6 h-20 border-b border-white/10 shrink-0">
                <button
                  onClick={handleMenuClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/60 border border-white/10 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
                  aria-label="Close menu"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Nav Links — top-aligned, no justify-center */}
              <nav className="flex flex-col flex-1 px-4 pt-4 pb-8 overflow-y-auto" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {filteredNavLinks.map(link => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMenuClose();
                          setTimeout(() => {
                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="flex items-center w-full min-h-[52px] px-4 rounded-xl text-white/80 hover:text-amber-400 text-sm sm:text-base font-semibold tracking-tight transition-all hover:bg-white/5 active:bg-white/10 active:scale-[0.98]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 my-6" />

                {/* CTA Button — below nav links, full width */}
                <button
                  onClick={() => {
                    handleMenuClose();
                    openInquiry();
                  }}
                  className={`
                    w-full min-h-[48px] rounded-xl 
                    bg-gradient-to-r from-amber-400 to-orange-500 
                    text-black font-black text-[10px] sm:text-xs tracking-wider
                    border border-amber-500/30
                    transition-all active:scale-[0.97]
                    ${bookButtonGlow ? 'animate-interaction-glow' : ''}
                  `}
                >
                  Book an Event
                </button>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── Marquee Announcement Bar ── pointer-events-none, z-30 ──────────── */}
      <div className="relative z-30 py-4 mt-20 md:mt-28 pointer-events-none">
        <div className="container mx-auto px-4 overflow-hidden relative h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={marqueeIndex}
              initial={marqueeDirection === 'enter' ? { y: 15, opacity: 0 } : { y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute left-0 top-0 w-full text-center text-amber-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
              style={{
                willChange: 'transform, opacity',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
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
