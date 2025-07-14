'use client';

import { quickNavContentId } from '@/lib/constants/quickNav';
import { useEffect, useState } from 'react';
import styles from './QuickNav.module.css';
import { useHeadingsObserver } from './useHeadingsObserver';
import { cx } from 'class-variance-authority';

const headingsToObserve = ':scope > :is(h2, h3, h4, h5, h6):not([data-quick-nav-ignore])';

export const QuickNav = () => {
  const [headings, setHeadings] = useState<Array<HeadingList>>([]);
  const activeHeadline = useHeadingsObserver(quickNavContentId, headingsToObserve, '-5% 0px -50% 0px', 1);

  useEffect(() => {
    const contentArea = document.getElementById(quickNavContentId);
    if (!contentArea) return;

    // Get all headings
    const headingElements = contentArea.querySelectorAll(headingsToObserve);
    const headingData: Array<HeadingList> = Array.from(headingElements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: parseInt(element.tagName[1]),
      children: [],
    }));

    // Create a nested structure
    const nestedHeadings: Array<HeadingList> = [];
    const stack: Array<HeadingList> = [];

    headingData.forEach((heading) => {
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop();
      }

      if (stack.length === 0) {
        nestedHeadings.push(heading);
      } else {
        stack[stack.length - 1].children.push(heading);
      }

      stack.push(heading);
    });

    setHeadings(nestedHeadings);
  }, []);

  if (headings.length) {
    return <nav className={styles.root}>{renderHeadings(headings, activeHeadline)}</nav>;
  }
};

const renderHeadings = (headings: Array<HeadingList>, activeHeadline: string) => {
  return (
    <ul className={cx(styles.list, 'bodyS')}>
      {headings.map((heading, i) => (
        <li key={`${heading.id}-${i}`} className={styles.item}>
          <a
            href={`#${heading.id}`}
            className={cx(styles.link, {
              [styles.active]: heading.id === activeHeadline,
            })}>
            {heading.text}
          </a>

          {heading.children ? renderHeadings(heading.children, activeHeadline) : null}
        </li>
      ))}
    </ul>
  );
};

interface HeadingList {
  id: string;
  text: string;
  level: number;
  children: Array<HeadingList>;
}
