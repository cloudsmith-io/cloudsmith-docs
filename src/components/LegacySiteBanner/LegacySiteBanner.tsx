"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './LegacySiteBanner.module.css';

export default function LegacySiteBanner(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('legacyBannerDismissed');
    if (isDismissed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isVisible && bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--banner-height', `${bannerHeight}px`);
    }

    // This is a cleanup function. It runs when the banner is closed or hidden.
    return () => {
      document.documentElement.style.removeProperty('--banner-height');
    };
  }, [isVisible]);

  const handleClose = (): void => {
    setIsVisible(false);
    sessionStorage.setItem('legacyBannerDismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={bannerRef} className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <span>Are you looking for the legacy documentation site?</span>
        <a href="https://help.cloudsmith.com" target="_blank" rel="noopener noreferrer" className={styles.bannerLink}>
          Visit help.cloudsmith.com
        </a>
      </div>
      <button onClick={handleClose} aria-label="Close this banner" className={styles.closeButton}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.293 8 4.11 11.182l.707.707L8 8.707l3.182 3.182.707-.707L8.707 8l3.182-3.182-.707-.707L8 7.293 4.818 4.11l-.707.707L7.293 8Z" />
        </svg>
      </button>
    </div>
  );
}