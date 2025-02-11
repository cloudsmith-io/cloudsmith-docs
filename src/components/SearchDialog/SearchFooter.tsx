import { Icon } from '@/icons';
import styles from './SearchFooter.module.css';

export const SearchFooter = () => {
  return (
    <>
      <dl className={styles.list}>
        <dt className={styles.title}>Navigate search</dt>
        <dd className={styles.data}>
          <Icon name="arrowDown" title="Arrow down" className={styles.icon} />
        </dd>
        <dd className={styles.data}>
          <Icon name="arrowUp" title="Arrow up" className={styles.icon} />
        </dd>
        <dt className={styles.title}>Select</dt>
        <dd className={styles.data}>
          <Icon name="enter" title="Enter" className={styles.icon} />
        </dd>
        <dt className={styles.title}>Open search</dt>
        <dd className={styles.data}>
          <kbd>/</kbd>
        </dd>
        <dt className={styles.title}>Close</dt>
        <dd className={styles.data}>
          <kbd>esc</kbd>
        </dd>
      </dl>
    </>
  );
};
