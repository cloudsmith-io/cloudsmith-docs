import { cx } from 'class-variance-authority';

import Navbar from '@/components/Navbar';

import { mdSystem, replica, replicaMono } from './_assets/fonts';

import './global.css';
import './variables.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(mdSystem.variable, replica.variable, replicaMono.variable)}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
