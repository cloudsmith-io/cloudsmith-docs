import Script from 'next/script';
import styles from './Video.module.css';
import { cx } from 'class-variance-authority';

export function Video({ wistiaId = 'r5d3j2nz4m' }: { wistiaId?: string }) {
  return (
    <div>
      <Script src="//fast.wistia.com/assets/external/E-v1.js" strategy="lazyOnload" />

      <div className={styles.videoResponsivePadding}>
        <div className={styles.videoResponsiveWrapper}>
          <div className={cx(styles.video, `wistia_embed wistia_async_${wistiaId} videoFoam=true`)} />
        </div>
      </div>
    </div>
  );
}
