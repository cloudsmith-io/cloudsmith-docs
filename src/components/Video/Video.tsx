'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { Icon } from '@/icons';

import styles from './Video.module.css';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function Video({ wistiaId = 'r5d3j2nz4m', posterImage, resumable = false }: VideoProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsPlaying(true);
  };

  return (
    <div className={styles.videoContainer}>
      {showOverlay && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <button className={styles.playButton} type="button" aria-label="Play video">
            <Icon name="action/play" title="" className={styles.playIcon} />
          </button>
        </div>
      )}
      <ReactPlayer
        src={`https://wistia.com/medias/${wistiaId}`}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={true}
        config={{
          wistia: {
            options: {
              resumable,
              playButton: false,
              controlsVisibleOnLoad: false,
              stillUrl: posterImage,
            },
          },
        }}
      />
    </div>
  );
}

interface VideoProps {
  wistiaId?: string;
  posterImage?: string;
  resumable?: boolean;
}
