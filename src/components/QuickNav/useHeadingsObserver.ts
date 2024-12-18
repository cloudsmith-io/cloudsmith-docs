import { useEffect, useState, useRef } from 'react';

export const useHeadingsObserver = (
  querySelector: string,
  rootMargin: string,
  threshold: number,
  idPrefix: string,
) => {
  const [activeHeadline, setActiveHeadline] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    function handleObsever(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveHeadline(entry.target.id);
        }
      });
    }

    if (observerRef !== undefined) {
      observerRef.current = new IntersectionObserver(handleObsever, {
        rootMargin: rootMargin,
        threshold: threshold,
      });

      const elements = document.querySelectorAll(querySelector);

      elements.forEach((elem) => {
        if (elem.id.startsWith(idPrefix)) {
          observerRef.current !== null ? observerRef.current.observe(elem) : null;
        }
      });
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [querySelector, rootMargin, threshold, idPrefix]);

  return activeHeadline;
};
