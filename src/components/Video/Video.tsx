'use client';

import dynamic from 'next/dynamic';
import styles from './Video.module.css';
import { Icon } from '@/icons';
import { useState, useRef } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function Video({ wistiaId = 'r5d3j2nz4m', posterImage, resumable = false }: VideoProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const playerRef = useRef<typeof ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsPlaying(true);
  };

  return (
    <div className={styles.videoContainer}>
      {showOverlay && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <button className={styles.playButton}>
            <Icon name="action/play" title="" className={styles.playIcon} />
          </button>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        url={`https://fast.wistia.net/embed/iframe/${wistiaId}`}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={true}
        config={{
          wistia: {
            options: {
              resumable: resumable,
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
