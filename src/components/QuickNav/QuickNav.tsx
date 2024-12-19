'use client';

import { quickNavPrefix } from '@/lib/constants/settings.mjs';
import { useEffect, useState } from 'react';
import styles from './QuickNav.module.css';
import { useHeadingsObserver } from './useHeadingsObserver';

const headingsToObserve = 'h2, h3, h4, h5, h6';

export const QuickNav = () => {
  const [headings, setHeadings] = useState<Array<HeadingList>>([]);
  const activeHeadline = useHeadingsObserver(headingsToObserve, '-5% 0px -50% 0px', 1, quickNavPrefix);

  useEffect(() => {
    // Get all headings
    const headingElements = document.querySelectorAll(headingsToObserve);
    const headingData: Array<HeadingList> = Array.from(headingElements)
      .filter((element) => element.id.startsWith(quickNavPrefix))
      .map((element) => ({
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

  return <nav className={styles.root}>{renderHeadings(headings, activeHeadline)}</nav>;
};

const renderHeadings = (headings: Array<HeadingList>, activeHeadline: string) => {
  return (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id}>
          <span
            {...(heading.id === activeHeadline && {
              className: styles.active,
            })}>
            {heading.text}
          </span>
          {heading.children.length > 0 && renderHeadings(heading.children, activeHeadline)}
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
