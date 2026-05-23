import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, text: "The best pani puri I've ever had in Tirunelveli! Absolutely fresh and hygienic.", author: "Karthik R.", rating: 5 },
  { id: 2, text: "Their momos are out of this world. Super spicy chutney and perfectly steamed.", author: "Priya S.", rating: 5 },
  { id: 3, text: "Great place for late night cravings. The mojitos are incredibly refreshing.", author: "Vijay T.", rating: 4 },
];

const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, idx) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="glass-panel p-8 rounded-[2rem] flex flex-col justify-between">
              <div>
                <div className="text-amber-400 text-2xl mb-4">
                  {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <span className="text-white font-semibold">{testimonial.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
