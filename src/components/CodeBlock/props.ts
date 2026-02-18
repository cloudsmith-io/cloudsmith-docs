import { ReactNode } from 'react';

export interface Props {
  children: string;
  className?: string;
  lang: string;
  header?: ReactNode;
  hideHeader?: boolean;
  variant?: 'default' | 'darker';
}
