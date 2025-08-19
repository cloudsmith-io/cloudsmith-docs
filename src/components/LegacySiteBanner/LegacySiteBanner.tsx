'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './LegacySiteBanner.module.css';

export default function LegacySiteBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('legacyBannerDismissed');
    if (isDismissed !== 'true') {
      // Update the CSS variable to make AppShell work
      document.documentElement.style.setProperty('--navbar-banner-height', '45px');
      setIsVisible(true);
    }
  }, []);

  const handleClose = (): void => {
    document.documentElement.style.setProperty('--navbar-banner-height', '0px');
    setIsVisible(false);
    sessionStorage.setItem('legacyBannerDismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={bannerRef} className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <span>Looking for our old documentation site?</span>
        <a
          href="https://help.cloudsmith.io"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bannerLink}>
          Visit help.cloudsmith.io{' '}
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m8.537 12.938 4.596-4.084V7.13L8.537 3.062l-.663.75 4.162 3.682h-9.17v1h9.166L7.873 12.19l.664.748Z"
              fill="currentColor"></path>
          </svg>
        </a>
      </div>
      <button onClick={handleClose} aria-label="Close this banner" className={styles.closeButton}>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M7.293 8 4.11 11.182l.707.707L8 8.707l3.182 3.182.707-.707L8.707 8l3.182-3.182-.707-.707L8 7.293 4.818 4.11l-.707.707L7.293 8Z" />
        </svg>
      </button>
    </div>
  );
}
