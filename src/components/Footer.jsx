import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

// ─── Sparkle/Glitter Particle Component ───────────────────────────────────────
const Sparkle = ({ style }) => (
  <span
    className="sparkle-particle"
    style={style}
  >
    ✦
  </span>
);

// ─── TrackTech Bytez Badge with slide-in + glitter ────────────────────────────
const TrackTechBadge = () => {
  const badgeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Intersection observer — animate when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (badgeRef.current) observer.observe(badgeRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate sparkle particles when visible
  useEffect(() => {
    if (!isVisible) return;

    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        style: {
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${6 + Math.random() * 8}px`,
          color: ['#fbbf24', '#f59e0b', '#fcd34d', '#ffffff'][Math.floor(Math.random() * 4)],
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${1.5 + Math.random() * 1.5}s`,
        },
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={badgeRef} className="text-right overflow-hidden">
      <a
        href="https://www.instagram.com/tracktechbytezz/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          tracktech-badge relative inline-flex items-center gap-2
          bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500
          text-white text-[10px] font-black uppercase tracking-[0.3em]
          px-5 py-2 rounded-full
          hover:shadow-[0_0_24px_rgba(251,191,36,0.4)] hover:scale-105
          transition-all duration-500 select-none
          ${isVisible ? 'tracktech-slide-in' : 'opacity-0 translate-x-full'}
        `}
        style={{ backgroundSize: '200% auto' }}
      >
        {/* Sparkle particles */}
        {sparkles.map(sparkle => (
          <Sparkle key={sparkle.id} style={sparkle.style} />
        ))}

        {/* Shine overlay */}
        <span className="tracktech-shine" />

        <span className="relative z-10">Made by</span>
        <span className="relative z-10 text-white font-black">TrackTech Bytez</span>
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-16 md:pt-24 pb-8">
        {/* ═══════════════════════════════════════════════════════════════
            MAIN 2-COLUMN CONTENT AREA (Mobile/Tablet Optimized)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-20">
          
          {/* ─── LEFT CONTENT AREA ─── */}
          <div className="flex flex-col space-y-12">
            {/* Top Area: About */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Namma <span className="text-amber-400">Taste</span>
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md font-medium">
                Namma Taste serves the most authentic and hygienic street food experience. 
                Taste that truly hits the spot, crafted with passion.
              </p>
            </div>

            {/* Bottom Area: Follow Us */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-amber-400/80 uppercase tracking-[0.3em]">Follow Us</h4>
              <div className="flex items-center gap-5">
                {[
                  { icon: <FaWhatsapp size={22} />, href: "https://wa.me/917708727459", color: "hover:bg-[#25D366]", label: "WhatsApp" },
                  { icon: <FaInstagram size={22} />, href: "https://www.instagram.com/namma.taste/", color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]", label: "Instagram" },
                  { icon: <FaEnvelope size={18} />, href: "mailto:hellonammataste@gmail.com", color: "hover:bg-amber-500", label: "Gmail" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT CONTENT AREA ─── */}
          <div className="flex flex-col space-y-12">
            {/* Top Area: Phone Numbers */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-amber-400/80 uppercase tracking-[0.3em]">Contact Us</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Phone 1", number: "+91 77087 27459", href: "tel:+917708727459" },
                  { label: "Phone 2", number: "+91 89736 74644", href: "tel:+918973674644" }
                ].map((phone, idx) => (
                  <a
                    key={idx}
                    href={phone.href}
                    className="group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-amber-400/30 hover:scale-[1.02]"
                    style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 transition-colors group-hover:bg-amber-400 group-hover:text-black">
                      <FaPhone size={14} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-0.5">{phone.label}</span>
                      <span className="text-white text-sm font-bold truncate transition-colors group-hover:text-amber-400">{phone.number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Area: Location/Map */}
            <div className="space-y-6">
              <div className="w-full h-[180px] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl relative group bg-white/5">
                <iframe
                  title="Namma Taste Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.5!2d77.7431!3d8.7208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed8dcd5a2a6b%3A0x7a0c4c4c1e0d0a01!2sSt.%20John's%20College%2C%20Palayamkottai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" height="100%"
                  className="grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <FaMapMarkerAlt size={16} />
                </div>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                  Opposite of John's College, Palayamkottai, Tirunelveli - 627002
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM FOOTER AREA ─── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-[10px] md:text-xs text-gray-600 font-black uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Namma Taste. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest hidden md:block">
              Premium Street Food Experience
            </p>
          </div>
          
          <TrackTechBadge />
        </div>
      </div>
    </footer>
  );
};

export default Footer;