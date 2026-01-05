'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollState {
  isScrolled: boolean;
  isHidden: boolean;
}

export function useScrollHeader(scrollThreshold = 50, hideThreshold = 100): ScrollState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollPosition = useRef(0);
  const ticking = useRef(false);

  const updateHeader = useCallback(() => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > scrollThreshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (currentScrollPosition > lastScrollPosition.current && currentScrollPosition > hideThreshold) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    lastScrollPosition.current = currentScrollPosition;
    ticking.current = false;
  }, [scrollThreshold, hideThreshold]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      if (!ticking.current) {
        if (prefersReducedMotion) {
          updateHeader();
        } else {
          window.requestAnimationFrame(updateHeader);
        }
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateHeader]);

  return { isScrolled, isHidden };
}
