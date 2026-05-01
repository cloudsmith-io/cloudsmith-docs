'use client';

import { CSSProperties, useMemo, useState } from 'react';

import { Icon } from '@/icons';

import styles from './Video.module.css';

export function Video({ wistiaId = 'r5d3j2nz4m', posterImage, resumable = false }: VideoProps) {
  const [showOverlay, setShowOverlay] = useState(true);

  const videoUrl = useMemo(() => {
    const params = new URLSearchParams({
      controlsVisibleOnLoad: 'false',
      playButton: 'false',
      resumable: String(resumable),
      seo: 'false',
      videoFoam: 'true',
    });

    if (!showOverlay) {
      params.set('autoPlay', 'true');
    }

    if (posterImage) {
      params.set('stillUrl', posterImage);
    }

    return `https://fast.wistia.net/embed/iframe/${wistiaId}?${params.toString()}`;
  }, [posterImage, resumable, showOverlay, wistiaId]);

  const overlayStyle = posterImage
    ? ({
        '--video-poster-image': `url("${posterImage}")`,
      } as CSSProperties)
    : undefined;

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  return (
    <div className={styles.videoContainer}>
      {showOverlay && (
        <div className={styles.overlay} onClick={handleOverlayClick} style={overlayStyle}>
          <button className={styles.playButton} type="button" aria-label="Play video">
            <Icon name="action/play" title="" className={styles.playIcon} />
          </button>
        </div>
      )}
      <iframe
        className={styles.player}
        src={videoUrl}
        title="Cloudsmith video"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

interface VideoProps {
  wistiaId?: string;
  posterImage?: string;
  resumable?: boolean;
}
