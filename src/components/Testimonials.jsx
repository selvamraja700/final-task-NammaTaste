import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  { id: 1, text: "Absolutely loved the steamed veg momos and spicy red chutney. The quality is outstanding and hygiene is top-notch!", author: "Surya", rating: 4 },
  { id: 2, text: "The bread omelette here is next level. Super crispy, loaded with spices, and very affordable. Perfect evening bite!", author: "RaviKumar", rating: 5 },
  { id: 3, text: "Very refreshing lime and blue mojitos! Perfect combination with their hot, crispy French fries.", author: "Pooja", rating: 5 },
  { id: 4, text: "The pani puri here is exceptionally good! Tangy, flavorful water and crunchy puris. Highly recommended!", author: "Sriknath", rating: 4 },
  { id: 5, text: "Excellent customer service and very quick prep. Everything is fresh, delicious, and well-packaged.", author: "Ajmal", rating: 5 }
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by one card width (clientWidth on mobile is roughly one card width)
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.85
        : scrollLeft + clientWidth * 0.85;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">What Our Customers Say</h2>
        
        {/* Relative wrapper to position absolute arrow buttons */}
        <div className="relative mt-16 px-10 md:px-0">
          {/* Left Arrow Button - Mobile Only */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-amber-400/40 text-amber-400 flex items-center justify-center backdrop-blur-sm active:scale-90 transition-all md:hidden"
            aria-label="Previous review"
          >
            <FaChevronLeft size={16} />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto overflow-y-hidden md:grid md:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 snap-x snap-mandatory w-full scroll-smooth custom-scrollbar"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={testimonial.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }} 
                className="glass-panel p-6 md:p-8 rounded-[2rem] flex flex-col justify-start w-[76vw] min-w-[76vw] md:w-full md:min-w-0 snap-center snap-always shrink-0 border border-amber-400/30 hover:border-amber-400/70 transition-all duration-300 gap-4"
              >
                {/* 1. Author Block (Name + Avatar) */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <span className="text-white font-semibold">{testimonial.author}</span>
                </div>

                {/* 2. Divider Line */}
                <div className="w-full h-px bg-white/10" />

                {/* 3. Review Text */}
                <p className="text-gray-300 italic text-sm md:text-base leading-relaxed">"{testimonial.text}"</p>

                {/* 4. Stars (at the bottom) */}
                <div className="flex items-center gap-2 text-amber-400 mt-auto pt-2">
                  <span className="text-xl">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </span>
                  <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded uppercase tracking-wider">{testimonial.rating}/5</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow Button - Mobile Only */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-amber-400/40 text-amber-400 flex items-center justify-center backdrop-blur-sm active:scale-90 transition-all md:hidden"
            aria-label="Next review"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
