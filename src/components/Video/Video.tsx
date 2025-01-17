'use client';

import dynamic from 'next/dynamic';
import styles from './Video.module.css';
import { useState, useRef } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function Video({
  wistiaId = 'r5d3j2nz4m',
  posterImage,
  resumable = false,
}: {
  wistiaId?: string;
  posterImage?: string;
  resumable?: boolean;
}) {
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
            {/* TODO; Add play icon to the registry and use it here */}
            <svg
              className={styles.playIcon}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M13 7.454v.939L6.63 14H6V2h.63L13 7.454Z" fill="currentColor"></path>
            </svg>
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
