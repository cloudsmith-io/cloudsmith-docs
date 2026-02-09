import styles from './PageInfo.module.css';
import { Link } from '@/components/Link';
import { cx } from 'class-variance-authority';
import { Icon } from '@/icons';
import { intlFormatDistance, parseISO } from 'date-fns';

export const PageInfo = ({ path = '', lastUpdated }: PageInfoProps) => {
  const docsUrl = process.env.NEXT_PUBLIC_CLOUDSMITH_DOCS_URL;
  const docsBranch = process.env.NEXT_PUBLIC_CLOUDSMITH_DOCS_BRANCH;
  const githubLink = `${docsUrl}/edit/${docsBranch}/${path}`;

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
      {docsUrl && docsBranch && (
        <Link className={cx(styles.githubLink, 'bodyS')} href={githubLink} target="_blank">
          <Icon title="View" name="github" />
          <span>Edit on GitHub</span>
        </Link>
      )}
    </div>
  );
};

interface PageInfoProps {
  path: string;
  lastUpdated?: string;
}
