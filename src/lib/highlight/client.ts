import { useEffect, useState } from 'react';

import type { Highlighter } from 'shiki';

import { getHighlighter } from './server';

export const useHighlighter = () => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!highlighter && !fetching) {
      setFetching(true);
      getHighlighter()
        .then((h) => {
          setHighlighter(h);
          setFetching(false);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
          setFetching(false);
        });
    }
  }, [highlighter, fetching]);

  return { highlighter, isFetching: fetching, isError: error };
};
