import Link, { LinkProps } from 'next/link';
import { ArrowIcon } from '@/icons/Arrow';

import styles from './GuideLink.module.css';

export const GuideLink = (props: GuideLinkProps) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest} className={styles.root}>
      {children}
      <ArrowIcon name="arrow" arrowDirection="right" as="svg" title="" />
    </Link>
  );
};

interface GuideLinkProps extends LinkProps {
  children: React.ReactNode;
}
