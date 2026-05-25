import { useState, useEffect, useCallback } from 'react';

export const useMarquee = (messages, intervalMs = 5000) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('enter');
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('exit');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setDirection('enter');
      }, 300);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [messages.length, intervalMs]);
  return { index, direction };
};

export const useAdvancedRateLimiter = (key) => {
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);

  useEffect(() => {
    const checkCooldown = () => {
      const stored = localStorage.getItem(key + '_cooldown');
      if (stored) {
        const endsAt = parseInt(stored, 10);
        const now = Date.now();
        if (now < endsAt) {
          setIsCooldown(true);
          setCooldownTimeLeft(Math.ceil((endsAt - now) / 1000));
        } else {
          setIsCooldown(false);
          setCooldownTimeLeft(0);
          localStorage.removeItem(key + '_cooldown');
          localStorage.removeItem(key + '_clicks'); // Reset click tracking when block ends
        }
      } else {
        setIsCooldown(false);
        setCooldownTimeLeft(0);
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, [key]);

  const recordClick = useCallback(() => {
    const storedCooldown = localStorage.getItem(key + '_cooldown');
    if (storedCooldown && Date.now() < parseInt(storedCooldown, 10)) {
      return { allowed: false, isCooldown: true };
    }

    const stored = localStorage.getItem(key + '_clicks');
    let clicks = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    
    // Clean up clicks older than 1 minute (60,000 ms)
    clicks = clicks.filter(ts => now - ts < 60 * 1000);
    
    // Add current click
    clicks.push(now);
    localStorage.setItem(key + '_clicks', JSON.stringify(clicks));

    // Evaluate Limits
    // Primary limit: Trigger block if user exceeds 100 clicks in the rolling 1-minute window
    if (clicks.length > 100) {
      // Trigger exactly 1-minute cooldown (60,000 ms)
      const endsAt = now + 60 * 1000;
      localStorage.setItem(key + '_cooldown', endsAt.toString());
      localStorage.removeItem(key + '_clicks'); // Clear current click counts immediately
      setIsCooldown(true);
      setCooldownTimeLeft(60);
      return { allowed: false, triggeredCooldown: true };
    }

    return { allowed: true };
  }, [key]);

  return { isCooldown, cooldownTimeLeft, recordClick };
};

export const useFormValidation = (initialState, validators) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](values[field], values);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validators]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialState), [initialState]);

  return { values, setValues, errors, handleChange, validate, reset };
};

export const useSwipeBack = (onSwipeBack, threshold = 80) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    // Check if horizontal movement is dominant
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Swiped from left to right
      if (distanceX < -threshold) {
        onSwipeBack();
      }
    }
  }, [touchStart, touchEnd, onSwipeBack, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};
