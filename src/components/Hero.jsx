import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const title1Ref = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const animationRef = useRef(null);
  const indicatorRef = useRef(null);
  
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = () => {
    window.scrollBy({ top: 350, behavior: 'smooth' });
  };

  useEffect(() => {
    // GSAP Timeline for orchestrating the staggered sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Bring in the animation smoothly
    tl.fromTo(animationRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
    )
    // 1. Text reveals in sequence
    .fromTo(title1Ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(indicatorRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] md:min-h-[90dvh] flex items-center pt-24 lg:pt-32 pb-16 lg:pb-20 overflow-hidden bg-[#0f0f0f]">
      {/* Ambient background glows for premium feel */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 md:w-[30rem] h-80 md:h-[30rem] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-center">
          
          {/* LEFT SIDE - DotLottie Animation - Optimized for Mobile Viewport */}
          <div className="flex items-center justify-center lg:justify-center relative z-10 overflow-hidden lg:overflow-visible">
            <div ref={animationRef} className="w-[200px] sm:w-[280px] lg:w-[450px] aspect-square flex items-center justify-center relative scale-125 sm:scale-110 lg:scale-100 transition-transform duration-700 pointer-events-none">
              {/* Background glow to emphasize animation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-orange-600/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
              
              <dotlottie-wc 
                src="https://lottie.host/16ebb563-ef88-4525-b546-4864887f110b/Q0UZoEEvp3.lottie" 
                autoplay 
                style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }}
              ></dotlottie-wc>
            </div>
          </div>

          {/* RIGHT SIDE - Content Area */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-20 relative">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-black leading-[1] mb-6 tracking-tight w-full">
              <div className="overflow-hidden pb-1">
                <div ref={title1Ref} className="text-white">Namma Taste</div>
              </div>
            </h1>

            <div className="overflow-hidden pb-6 w-full">
              <h2 ref={taglineRef} className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 leading-snug">
                Taste That Hits Different
              </h2>
            </div>

            <div className="overflow-hidden w-full max-w-2xl">
              <p ref={descRef} className="text-gray-300 font-medium text-lg lg:text-xl mb-10 lg:mb-12 leading-relaxed">
                Experience premium street food crafted with passion. Reimagining the classics into a truly unforgettable culinary journey.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full">
              <a 
                href="#categories" 
                className="group relative flex items-center justify-center w-full sm:w-auto min-w-[200px] min-h-[56px] bg-amber-400 rounded-2xl text-black font-extrabold text-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] focus:outline-none focus:ring-4 focus:ring-amber-400/50"
              >
                <span className="relative z-10">Explore Menu</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </a>
              
              <a 
                href="#contact" 
                className="group relative flex items-center justify-center w-full sm:w-auto min-w-[200px] min-h-[56px] bg-transparent border-2 border-white/10 rounded-2xl text-white font-bold text-lg transition-all duration-500 hover:border-amber-400 hover:text-amber-400 hover:scale-[1.03] hover:bg-amber-400/5 hover:shadow-[0_0_35px_rgba(251,191,36,0.15)] focus:outline-none focus:ring-4 focus:ring-amber-400/50"
              >
                Contact Us
              </a>
            </div>

            {/* Mobile Scroll Indicator */}
            <div 
              ref={indicatorRef}
              className={`md:hidden flex flex-col items-center justify-center w-full mt-10 transition-opacity duration-700 cursor-pointer ${showScrollIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={handleScrollClick}
              aria-label="Scroll down"
            >
              <div className="animate-bounce text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 13 12 18 17 13"></polyline>
                  <polyline points="7 6 12 11 17 6"></polyline>
                </svg>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
