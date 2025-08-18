'use client';

import { Flex } from '@/components/Flex';
import { Link } from '@/components/Link';
import { Icon } from '@/icons';
import { cx } from 'class-variance-authority';
import React, { useEffect, useRef, useState } from 'react';
import styles from './LegacySiteBanner.module.css';

export default function LegacySiteBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('csm-legacy-banner-dismissed');
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
    sessionStorage.setItem('csm-legacy-banner-dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={bannerRef} className={cx(styles.root, 'bodyS')}>
      <Flex className={styles.content} gap="xs">
        <span>Looking for the legacy documentation site?</span>
        <Link
          href="https://help.cloudsmith.io"
          target="_blank"
          rel="noopener noreferrer"
          className={cx(styles.link)}>
          Visit help.cloudsmith.io <Icon name="arrowRight" title="" />
        </Link>
      </Flex>
      <button onClick={handleClose} aria-label="Close this banner" className={styles.close}>
        <Icon name="action/close" title="" />
      </button>
    </div>
  );
}
