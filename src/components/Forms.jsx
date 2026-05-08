import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ContactForm = ({ contactForm, contactSubmitting, handleContactSubmit }) => {
  return (
    <section id="contact" className="py-24 md:py-40 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #fdfcfb, #faf9f6)' }}>
      {/* Subtle background glow for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] tracking-tight mb-6">
            Get In <span className="text-amber-500">Touch</span>
          </h2>
          <p className="text-[#5a5a5a] text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Have a question or want to book us for an event? We'd love to hear from you.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="bg-white p-8 md:p-20 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-[#f0f0f0] relative"
        >
          {/* Decorative element - Strictly contained */}
          <div className="absolute -top-10 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl"></div>

          <form onSubmit={handleContactSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="block text-[11px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input 
                  type="text" name="name" placeholder="John Doe"
                  value={contactForm.values.name} onChange={contactForm.handleChange} 
                  className="w-full bg-[#faf9f6] border border-[#ecebe8] rounded-2xl px-8 min-h-[72px] text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all font-medium placeholder:text-gray-400" 
                />
                {contactForm.errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.errors.name}</p>}
              </div>
              <div className="space-y-3">
                <label className="block text-[11px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                <input 
                  type="tel" name="phone" placeholder="10-digit number"
                  value={contactForm.values.phone} onChange={contactForm.handleChange} 
                  className="w-full bg-[#faf9f6] border border-[#ecebe8] rounded-2xl px-8 min-h-[72px] text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all font-medium placeholder:text-gray-400" 
                />
                {contactForm.errors.phone && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.errors.phone}</p>}
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input 
                type="email" name="email" placeholder="hello@example.com"
                value={contactForm.values.email} onChange={contactForm.handleChange} 
                className="w-full bg-[#faf9f6] border border-[#ecebe8] rounded-2xl px-8 min-h-[72px] text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all font-medium placeholder:text-gray-400" 
              />
              {contactForm.errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.errors.email}</p>}
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Message</label>
              <textarea 
                name="message" rows="5" placeholder="Tell us how we can help..."
                value={contactForm.values.message} onChange={contactForm.handleChange} 
                className="w-full bg-[#faf9f6] border border-[#ecebe8] rounded-2xl px-8 py-6 text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all resize-none min-h-[180px] font-medium placeholder:text-gray-400" 
              />
              {contactForm.errors.message && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.errors.message}</p>}
            </div>
            <button 
              type="submit" 
              disabled={contactSubmitting} 
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black min-h-[56px] text-lg font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(251,191,36,0.3)] hover:shadow-[0_20px_60px_rgba(251,191,36,0.5)] flex items-center justify-center group overflow-hidden relative"
            >
              <span className="relative z-10">{contactSubmitting ? 'Sending...' : 'Send Message'}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};


export const OrderModal = React.memo(({ isOpen, onClose, onSubmit, formData, errors, isSubmitting, isCooldown, cooldownTimeLeft }) => {
  // ─── Body Scroll Lock + Escape Key + Keyboard Accessibility ───
  // Engineering note: We ONLY lock body scroll. We never set pointer-events on
  // any parent because the modal content is a child of #root — doing so would
  // kill all interactions inside the modal itself.
  useEffect(() => {
    if (!isOpen) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow     = 'hidden';
    document.body.style.paddingRight = scrollBarWidth > 0 ? `${scrollBarWidth}px` : '';

    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow     = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-[1100] flex items-center justify-center p-3 sm:p-6"
          style={{ 
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Area */}
            <div 
              className="px-5 md:px-12 py-4 md:py-8 border-b border-gray-100 flex justify-between items-center bg-white z-10"
            >
              <div className="space-y-1">
                <h3 className="text-xl md:text-4xl font-black text-slate-900 tracking-tighter font-heading leading-tight">
                  Book an <span className="text-amber-500">Event</span>
                </h3>
                <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Premium Culinary Inquiry</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90 border border-slate-100"
              >
                <FaTimes size={18} />
              </button>
            </div>
            
            {/* Form Body: Compact & Scrollable only if needed */}
            <div className="flex-grow overflow-y-auto custom-scrollbar px-6 md:px-12 py-6 md:py-10">
              <form onSubmit={onSubmit} id="booking-form" className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:gap-y-6">
                
                {/* Column 1 */}
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text" name="name" placeholder="John Doe"
                      value={formData.values.name} onChange={formData.handleChange}
                      className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl px-4 md:px-5 min-h-[46px] md:min-h-[56px] text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-gray-400 font-medium"
                    />
                    {errors.name && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      type="tel" name="phone" placeholder="10-digit mobile"
                      value={formData.values.phone} onChange={formData.handleChange}
                      className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl px-4 md:px-5 min-h-[46px] md:min-h-[56px] text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-gray-400 font-medium"
                    />
                    {errors.phone && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Event Category</label>
                    <div className="relative">
                      <select
                        name="eventType" value={formData.values.eventType} onChange={formData.handleChange}
                        className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl px-4 md:px-5 min-h-[46px] md:min-h-[56px] text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all appearance-none cursor-pointer font-medium"
                      >
                        <option value="">Select Category</option>
                        {['Birthday Party','Anniversary','Corporate Event','Wedding','Get-together','Other (please specify)'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    {errors.eventType && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.eventType}</p>}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Venue Address</label>
                    <input
                      type="text" name="address" placeholder="Event Location"
                      value={formData.values.address} onChange={formData.handleChange}
                      className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl px-4 md:px-5 min-h-[46px] md:min-h-[56px] text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-gray-400 font-medium"
                    />
                    {errors.address && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.address}</p>}
                  </div>

                  <div className="space-y-1.5 md:space-y-2 relative">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Event Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-amber-500 z-10">
                        <FaCalendarAlt size={14} />
                      </div>
                      <DatePicker
                        selected={formData.values.eventDate}
                        onChange={(date) => formData.setValues(prev => ({...prev, eventDate: date}))}
                        minDate={new Date()}
                        placeholderText="Choose Date"
                        className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl pl-10 pr-4 min-h-[46px] md:min-h-[56px] text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all cursor-pointer font-medium"
                        dateFormat="MMMM d, yyyy"
                        wrapperClassName="w-full block"
                      />
                    </div>
                    {errors.eventDate && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.eventDate}</p>}
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Menu Preferences</label>
                    <textarea
                      name="items" placeholder="Items of interest..." rows="2"
                      value={formData.values.items} onChange={formData.handleChange}
                      className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-gray-400 resize-none min-h-[80px] md:min-h-[120px] font-medium"
                    />
                    {errors.items && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.items}</p>}
                  </div>
                </div>

                {/* Full Width Section for 'Other' */}
                {formData.values.eventType === 'Other (please specify)' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 space-y-1.5 md:space-y-2">
                    <label className="block text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-widest ml-1">Specify Event Type</label>
                    <input
                      type="text" name="eventTypeOther" placeholder="What's the occasion? (min 25 chars)"
                      value={formData.values.eventTypeOther} onChange={formData.handleChange}
                      className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl md:rounded-2xl px-4 md:px-5 min-h-[46px] md:min-h-[56px] text-sm md:text-base text-[#1a1a1a] focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all font-medium"
                    />
                    {errors.eventTypeOther && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.eventTypeOther}</p>}
                  </motion.div>
                )}
              </form>
            </div>

            {/* Footer Area: Sticky CTA */}
            <div className="px-6 md:px-12 py-6 md:py-8 border-t border-gray-100 bg-[#faf9f6]/80 backdrop-blur-md">
              <button 
                form="booking-form"
                type="submit" 
                disabled={isSubmitting || isCooldown} 
                className={`w-full min-h-[48px] md:min-h-[56px] text-sm md:text-lg font-black rounded-xl md:rounded-2xl transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3 ${
                  isCooldown 
                    ? 'bg-red-50 text-red-500 border border-red-100 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:scale-[1.02] active:scale-95 hover:shadow-amber-500/30'
                }`}
              >
                {isCooldown 
                  ? `Wait ${Math.floor(cooldownTimeLeft/60)}:${(cooldownTimeLeft%60).toString().padStart(2,'0')}` 
                  : isSubmitting 
                    ? <span className="flex items-center gap-3"><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Submitting...</span>
                    : 'Send Booking Inquiry'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});


