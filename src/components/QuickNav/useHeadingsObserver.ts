import { useEffect, useState, useRef } from 'react';

export const useHeadingsObserver = (
  scopeId: string,
  querySelector: string,
  rootMargin: string,
  threshold: number,
) => {
  const [activeHeadline, setActiveHeadline] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    function handleObserver(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveHeadline(entry.target.id);
        }
      });
    }

    if (observerRef !== null) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        rootMargin: rootMargin,
        threshold: threshold,
      });

      const observerArea = document.getElementById(scopeId);
      if (!observerArea) return;
      const elements = observerArea.querySelectorAll(querySelector);

      elements.forEach((elem) => {
        if (observerRef.current !== null) {
          observerRef.current.observe(elem);
        }
      });
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [querySelector, rootMargin, threshold, scopeId]);

  return activeHeadline;
};
