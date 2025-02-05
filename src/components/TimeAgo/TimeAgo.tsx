import { Icon } from '@/icons';
import { intlFormatDistance, parseISO } from 'date-fns';

import { HorizontalRule } from '@/components';

import styles from './TimeAgo.module.css';

export async function TimeAgo({ date }: TimeAgoProps) {
  return (
    <>
      <p className={styles.root}>
        <Icon name="action/check" title="" />
        <time dateTime={date}>Updated {getTimeAgo(date)}</time>
      </p>
      <HorizontalRule />
    </>
  );
}

function getTimeAgo(comparisonDate: string) {
  const compare = parseISO(comparisonDate);
  const today = new Date();

  return intlFormatDistance(compare, today, { locale: 'en' });
}

interface TimeAgoProps {
  date: string;
}
