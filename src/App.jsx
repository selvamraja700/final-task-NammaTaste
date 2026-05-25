import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Hooks & Helpers
import { useAdvancedRateLimiter, useFormValidation } from './utils/hooks';
import { getTodayDate, getMaxDate, WEB3FORMS_ACCESS_KEY, isReviewsEnabled } from './utils/helpers';

// Firebase Analytics
import { trackPageView, trackSession, trackEvent } from './firebase/analytics';

// Auth & Admin
import { AuthProvider } from './contexts/AuthContext';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Main site components
import AccessPage from './components/AccessPage';
import RateLimitError from './components/RateLimitError';
import Notification from './components/Notification';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import { ContactForm, OrderModal } from './components/Forms';
import Footer from './components/Footer';

const ENABLE_LOCK = import.meta.env.VITE_ENABLE_LOCK === 'true';

// ─── Main Site ─────────────────────────────────────────────────────────────────
function MainSite() {
  const [isUnlocked, setIsUnlocked] = useState(
    !ENABLE_LOCK || localStorage.getItem('namma_taste_unlocked') === 'true'
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen]     = useState(false);
  const [showOrderModal, setShowOrderModal]     = useState(false);
  const [notification, setNotification]         = useState({ show: false, message: '', type: '' });

  const { isCooldown, cooldownTimeLeft, recordClick } = useAdvancedRateLimiter('namma_taste_booking_clicks');

  // Track page view & session once on mount
  useEffect(() => {
    trackPageView('home');
    trackSession();
  }, []);

  const orderForm = useFormValidation(
    { name: '', phone: '', address: '', eventType: '', eventTypeOther: '', eventDate: new Date(), items: '' },
    {
      name:          v => !v.trim() ? 'Name is required' : null,
      phone:         v => !/^\d{10}$/.test(v) ? 'Must be 10 digits' : null,
      address:       v => !v.trim() ? 'Event address required' : null,
      eventType:     v => !v ? 'Please select an event type' : null,
      eventTypeOther:(v, all) =>
        all.eventType === 'Other (please specify)' && (!v.trim() || v.length < 25 || /\s/.test(v))
          ? 'Minimum 25 characters, no spaces' : null,
      eventDate:     v => !v ? 'Event date required' : null,
      items:         v => !v.trim() ? 'Please specify items of interest' : null,
    }
  );

  const contactForm = useFormValidation(
    { name: '', email: '', phone: '', message: '' },
    {
      name:    v => !v.trim() ? 'Name required' : null,
      email:   v => !/\S+@\S+\.\S+/.test(v) ? 'Valid email required' : null,
      phone:   v => !/^\d{10}$/.test(v) ? '10 digits required' : null,
      message: v => v.trim().length < 10 ? 'Minimum 10 characters' : null,
    }
  );

  const [orderSubmitting, setOrderSubmitting]     = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  }, []);

  const openInquiry = (item = null) => {
    if (item) orderForm.setValues(prev => ({ ...prev, items: item.name }));
    setShowOrderModal(true);
    trackEvent('inquiry_modal_opened', { item: item?.name || null });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderForm.validate()) return;

    const rateCheck = recordClick();
    if (!rateCheck.allowed) {
      if (rateCheck.triggeredCooldown) {
        showNotification('Unusual activity detected. Cooldown initiated.', 'error');
      } else {
        showNotification('Rate limit active. Please wait.', 'error');
      }
      return;
    }

    setOrderSubmitting(true);
    try {
      const finalEventType = orderForm.values.eventType === 'Other (please specify)'
        ? orderForm.values.eventTypeOther.trim()
        : orderForm.values.eventType;

      const orderMessage = `Booking Inquiry details: ${JSON.stringify(orderForm.values, null, 2)}`;

      const res = await fetch(import.meta.env.VITE_WEB3FORMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: '📅 New Booking Inquiry',
          ...orderForm.values,
          eventType: finalEventType,
          message: orderMessage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Inquiry sent successfully! We will contact you soon.');
        trackEvent('inquiry_submitted', { eventType: finalEventType });
        orderForm.reset();
        setShowOrderModal(false);
      } else throw new Error();
    } catch {
      showNotification('Inquiry failed. Try again.', 'error');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.validate()) return;
    setContactSubmitting(true);
    try {
      const res = await fetch(import.meta.env.VITE_WEB3FORMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Contact',
          ...contactForm.values,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Message sent! We'll reply soon.");
        trackEvent('contact_submitted');
        contactForm.reset();
      } else throw new Error();
    } catch {
      showNotification('Failed. Try again.', 'error');
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setMobileMenuOpen(false);
    trackEvent('menu_category_clicked', { category: categoryId });
    setTimeout(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('namma_taste_unlocked', 'true');
  };

  if (!isUnlocked) return <AccessPage onUnlock={handleUnlock} />;

  return (
    <div 
      className="relative min-h-screen bg-[#0f0f0f] text-white selection:bg-amber-500/30 selection:text-amber-200 overflow-x-clip max-w-[100vw] w-full"
      style={{ isolation: 'isolate' }}
    >
      <AnimatePresence>
        {notification.show && (
          <Notification message={notification.message} type={notification.type} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCooldown && <RateLimitError timeLeft={cooldownTimeLeft} />}
      </AnimatePresence>

      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={handleOrderSubmit}
        formData={orderForm}
        errors={orderForm.errors}
        isSubmitting={orderSubmitting}
        isCooldown={isCooldown}
        cooldownTimeLeft={cooldownTimeLeft}
      />

      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openInquiry={openInquiry}
      />
      <Hero />
      <Features
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        setSelectedCategory={setSelectedCategory}
      />
      {isReviewsEnabled() && <Testimonials />}
      <ContactForm
        contactForm={contactForm}
        contactSubmitting={contactSubmitting}
        handleContactSubmit={handleContactSubmit}
      />
      <Footer />
    </div>
  );
}

// ─── Root App with Router + Auth ───────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"            element={<MainSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;