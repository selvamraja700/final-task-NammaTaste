import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { LOGO_URL } from '../utils/helpers';

const Footer = ({ openInquiry }) => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-amber-500/5 rounded-b-[100%] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-16 md:pt-20 pb-6">

        {/* ═══════════════════════════════════════════════════════════════
            4-Column Grid
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">

          {/* ── Column 1: About ──────────────────────────────────────── */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <a href="#home" className="group inline-block mb-5 active:scale-95 transition-transform relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <img
                src={LOGO_URL}
                alt="Namma Taste Logo"
                className="relative h-20 w-20 rounded-full object-cover ring-2 ring-amber-400/50 shadow-xl"
              />
            </a>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Namma Taste</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">
              Namma Taste serves the most authentic and hygienic street food experience. Taste that truly hits the spot, crafted with passion.
            </p>
          </div>

          {/* ── Column 2: Contact Us ─────────────────────────────────── */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-xs font-bold text-amber-400/80 uppercase tracking-[0.2em] mb-6">Contact Us</h4>

            <a
              href="tel:+917708727459"
              className="group flex items-center gap-4 mb-4 hover:translate-x-1 transition-transform duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400
                              group-hover:bg-amber-500/15 group-hover:border-amber-500/30 group-hover:scale-110 transition-all duration-300">
                <FaPhone size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Phone 1</span>
                <span className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">+91 77087 27459</span>
              </div>
            </a>

            <a
              href="tel:+918973674644"
              className="group flex items-center gap-4 hover:translate-x-1 transition-transform duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400
                              group-hover:bg-amber-500/15 group-hover:border-amber-500/30 group-hover:scale-110 transition-all duration-300">
                <FaPhone size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Phone 2</span>
                <span className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">+91 89736 74644</span>
              </div>
            </a>
          </div>

          {/* ── Column 3: Follow Us ──────────────────────────────────── */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-xs font-bold text-amber-400/80 uppercase tracking-[0.2em] mb-6">Follow Us</h4>
            <p className="text-gray-500 text-xs mb-5 max-w-[220px]">
              Stay updated with our latest dishes, offers and foodie stories.
            </p>
            <div className="flex items-center gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/917708727459?text=Hi,%20my%20name%20is%20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300
                           hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.35)]
                           hover:-translate-y-1 transition-all duration-300"
                title="WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp size={22} />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/namma.taste/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300
                           hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]
                           hover:border-transparent hover:shadow-[0_0_20px_rgba(220,39,67,0.35)]
                           hover:-translate-y-1 transition-all duration-300"
                title="Instagram"
                aria-label="Visit Instagram"
              >
                <FaInstagram size={22} />
              </a>
              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300
                           hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.35)]
                           hover:-translate-y-1 transition-all duration-300"
                title="Facebook"
                aria-label="Visit Facebook"
              >
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>

          {/* ── Column 4: Location ───────────────────────────────────── */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-xs font-bold text-amber-400/80 uppercase tracking-[0.2em] mb-6">Location</h4>
            {/* Map Card */}
            <div className="w-full h-[160px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl relative group bg-white/5 mb-4">
              <iframe
                title="Namma Taste Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.5!2d77.7431!3d8.7208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed8dcd5a2a6b%3A0x7a0c4c4c1e0d0a01!2sSt.%20John's%20College%2C%20Palayamkottai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="flex items-center gap-2 text-gray-400 text-xs leading-relaxed">
              <FaMapMarkerAlt className="text-amber-500 shrink-0" size={14} />
              <span>Opposite of John's College, Palayamkottai, Tirunelveli - 627002</span>
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            Divider + Quick Actions
        ═══════════════════════════════════════════════════════════════ */}
        <div className="border-t border-white/5 pt-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Email */}
          <a
            href="mailto:hellonammataste@gmail.com"
            className="text-gray-400 text-sm hover:text-amber-400 transition-colors group flex items-center gap-2"
          >
            <span className="text-gray-600 group-hover:text-amber-500 transition-colors">✉</span>
            hellonammataste@gmail.com
          </a>
          {/* Book Event CTA */}
          <button
            onClick={openInquiry}
            className="px-8 py-3 rounded-full font-bold text-sm tracking-wide text-white
                       bg-gradient-to-r from-amber-500 to-orange-600
                       hover:from-amber-400 hover:to-orange-500
                       shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]
                       hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
          >
            Book Event
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            Copyright
        ═══════════════════════════════════════════════════════════════ */}
        <div className="border-t border-white/5 pt-6 pb-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] md:text-xs text-gray-600 font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Namma Taste. All rights reserved.</p>
          <p>Premium Street Food.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;