'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Link } from '@/components/Link';
import { Icon } from '@/icons';

import styles from './LegacySiteBanner.module.css';

export default function LegacySiteBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('csm-legacy-banner-dismissed');
    if (isDismissed !== 'true') {
      // Update the CSS variable to make AppShell work
      document.documentElement.style.setProperty('--navbar-banner-height', '45px');
      setIsVisible(true);
    }
  }, []);

  const handleClose = (): void => {
    document.documentElement.style.setProperty('--navbar-banner-height', '0px');
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
