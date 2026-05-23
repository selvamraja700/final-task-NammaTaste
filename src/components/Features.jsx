import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaTimes, FaChevronLeft } from 'react-icons/fa';
import { categories, paniPuriItems, momoItems, mojitoItems, crispItems, breadOmeletteItems } from '../data';
import { useSwipeBack } from '../utils/hooks';
import { smartBack, openModalWithHistory } from '../utils/helpers';

const Features = ({ selectedCategory, handleCategoryClick, setSelectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  const closeItemModal = () => smartBack(() => setSelectedItem(null));
  const swipeHandlers = useSwipeBack(closeItemModal);
  
  const handleOpenItem = (item) => {
    setSelectedItem(item);
    openModalWithHistory('itemDetail', `#item-${item.id}`);
  };

  const categoryDataMap = { 
    'pani-puri': paniPuriItems, 
    'momos': momoItems, 
    'mojitos': mojitoItems, 
    'crisp-items': crispItems,
    'bread-omelette': breadOmeletteItems 
  };
  const currentMenuItems = selectedCategory ? categoryDataMap[selectedCategory] : [];

  // Listen for browser back button
  useEffect(() => {
    const handlePopState = (e) => {
      // If we popped back to a state that is NOT 'itemDetail'
      if (!e.state || e.state.modal !== 'itemDetail') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = '';
      }
    }
  }, [selectedItem]);

  return (
    <>
      <section id="categories" className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #fdfcfb, #faf9f6)' }}>
        {/* Subtle ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.04),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-[#1a1a1a] mb-4 text-center tracking-tight">Our Specialties</h2>
          <p className="text-center text-[#5a5a5a] mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto">Select a category to view our delicious offerings. Every dish is crafted with perfection.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((cat, idx) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} onClick={() => handleCategoryClick(cat.id)} className="cursor-pointer group">
                <div className="bg-white rounded-[2rem] p-5 flex flex-col items-center relative overflow-hidden h-full min-h-[48px] transition-all duration-300 border-2 border-black/10 hover:border-amber-400/40 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(251,191,36,0.12)] active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="w-[88%] aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover block pointer-events-none select-none group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-[#1a1a1a] mb-2">{cat.title}</h3>
                  <p className="text-[#5a5a5a] text-sm text-center mb-6 leading-relaxed">{cat.description}</p>
                  <div className="mt-auto inline-flex items-center justify-center w-full py-3 rounded-xl bg-[#1a1a1a] group-hover:bg-amber-400 group-hover:text-black text-white text-sm font-bold transition-all duration-300">
                    View Menu <FaArrowRight size={12} className="ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Menu Container */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.section id="menu" key={selectedCategory} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="py-16 md:py-20 bg-[#0f0f0f] border-t border-white/5 relative">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">{categories.find(c => c.id === selectedCategory)?.title} Menu</h2>
                  <div className="w-20 md:w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="group text-gray-400 hover:text-white transition-colors text-sm font-semibold min-h-[48px] px-6 py-2 rounded-full border border-white/10 hover:border-white/30 flex items-center gap-2 active:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                  Close Menu <FaTimes className="group-hover:rotate-90 transition-transform duration-300"/>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentMenuItems.map((item, idx) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: idx * 0.05 }} 
                    className="glass-panel rounded-[2rem] p-5 flex flex-col h-full cursor-pointer group hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 active:scale-[0.98] border border-white/5 hover:border-amber-400/30 hover:shadow-[0_10px_30px_rgba(251,191,36,0.1)]"
                    onClick={() => handleOpenItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleOpenItem(item); }}
                  >
                    <div className="w-[88%] mx-auto aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-black/40 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover block pointer-events-none select-none group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {item.badge && <span className="absolute top-2.5 right-2.5 bg-amber-400 text-black text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full shadow-lg pointer-events-none select-none">{item.badge}</span>}
                    </div>
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-heading leading-tight mb-2 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-2">{item.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-amber-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                        <span>View Details</span>
                        <FaArrowRight size={12} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            {/* Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#0f0f0f]/80 backdrop-blur-md pointer-events-auto cursor-pointer"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              onClick={closeItemModal}
              aria-hidden="true"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto z-10 flex flex-col md:flex-row max-h-[90dvh] overflow-y-auto custom-scrollbar"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              {...swipeHandlers}
            >
              {/* Back Button (Mobile) & Close Button (Desktop) */}
              <button 
                onClick={closeItemModal} 
                className="absolute top-4 left-4 md:left-auto md:right-4 z-20 h-10 px-4 md:px-0 md:w-10 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-[1.25rem] md:rounded-full flex items-center justify-center text-white/80 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 border border-white/10 gap-2"
                aria-label="Close modal or go back"
              >
                <FaChevronLeft className="md:hidden" size={12} />
                <span className="text-sm font-semibold md:hidden">Back</span>
                <FaTimes className="hidden md:block" size={16} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[450px] relative">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f0f0f] opacity-90 md:opacity-100"></div>
              </div>

              {/* Modal Text Content */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center relative z-10 bg-[#0f0f0f]">
                {selectedItem.badge && (
                  <span className="inline-block self-start bg-amber-400/10 text-amber-400 text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full mb-4 border border-amber-400/20">
                    {selectedItem.badge}
                  </span>
                )}
                <h3 id="modal-title" className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4 leading-tight">{selectedItem.name}</h3>
                <div className="w-16 h-1.5 bg-amber-400 rounded-full mb-6"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 flex-grow">
                  {selectedItem.description}
                </p>
                <button 
                  onClick={closeItemModal}
                  className="mt-auto btn-outline w-full text-center min-h-[56px] text-lg rounded-2xl"
                >
                  Back to Menu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Features;
