import styles from './SidePanel.module.css';
import { Link } from '@/components/Link';
import { cx } from 'class-variance-authority';
import { Icon } from '@/icons';
import { intlFormatDistance, parseISO } from 'date-fns';

export const SidePanel = ({ path = '', lastUpdated }: SidePanelProps) => {
  const githubLink = `${process.env.NEXT_PUBLIC_CLOUDSMITH_DOCS_URL}/tree/${process.env.NEXT_PUBLIC_CLOUDSMITH_DOCS_BRANCH}/${path}`;

  const getUpdatedLabel = (date: string) => {
    const compare = parseISO(date);
    const today = new Date();
    return `Updated ${intlFormatDistance(compare, today, { locale: 'en' })}`;
  };

  return (
    <div className={styles.root}>
      {lastUpdated ? (
        <div className={cx(styles.dateUpdated, 'monoXSUppercase')}>{getUpdatedLabel(lastUpdated)}</div>
      ) : null}
      <Link className={cx(styles.githubLink, 'bodyS')} href={githubLink} target="_blank">
        <Icon title="View" name="github" />
        <span>View on GitHub</span>
      </Link>
    </div>
  );
};

interface SidePanelProps {
  path: string;
  lastUpdated?: string;
}
