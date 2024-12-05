'use client';

import { useState } from 'react';

export const CopyButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <button disabled={isCopied} onClick={copy}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};
