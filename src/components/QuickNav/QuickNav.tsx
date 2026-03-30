'use client';

import { useEffect, useState } from 'react';

import { cx } from 'class-variance-authority';
import { usePathname } from 'next/navigation';

import { quickNavContentSelector } from '@/lib/constants/quickNav';

import styles from './QuickNav.module.css';
import { useHeadingsObserver } from './useHeadingsObserver';

const headingsToObserve = ':scope > :is(h2, h3, h4, h5, h6):not([data-quick-nav-ignore])';

export const scrollToHashTarget = (hash = window.location.hash) => {
  const normalizedHash = hash.replace(/^#/, '');
  if (!normalizedHash) return false;

  const targetId = decodeURIComponent(normalizedHash);
  const target = document.getElementById(targetId);
  if (!target) return false;

  target.scrollIntoView({ block: 'start' });
  return true;
};

export const QuickNav = () => {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Array<HeadingList>>([]);
  const activeHeadline = useHeadingsObserver(
    quickNavContentSelector,
    headingsToObserve,
    '-5% 0px -50% 0px',
    1,
  );

  useEffect(() => {
    if (!headings.length) return;

    const queueHashScroll = () => window.requestAnimationFrame(() => scrollToHashTarget());

    queueHashScroll();
    window.addEventListener('hashchange', queueHashScroll);

    return () => {
      window.removeEventListener('hashchange', queueHashScroll);
    };
  }, [headings.length, pathname]);

  useEffect(() => {
    const contentArea = document.querySelector(quickNavContentSelector);
    if (!(contentArea instanceof HTMLElement)) return;

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
