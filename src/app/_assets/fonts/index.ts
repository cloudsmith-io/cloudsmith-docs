import localFont from 'next/font/local';

const replica = localFont({
  variable: '--font-family-headline',
  src: './ReplicaLLSub-Regular.woff2',
  fallback: ['system-ui', 'sans-serif'],
});

const replicaMono = localFont({
  variable: '--font-family-mono',
  src: './ReplicaMonoLLSub-Regular.woff2',
  fallback: ['monospace'],
});

const mdSystem = localFont({
  variable: '--font-family-body',
  src: [
    {
      path: './MDSystem-Regular.woff2',
      weight: '400',
    },
    {
      path: './MDSystem-Semibold.woff2',
      weight: '600',
    },
  ],
  fallback: ['system-ui', 'sans-serif'],
});

export { replica, replicaMono, mdSystem };
