import getImageSize from 'image-size';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { ImageProps } from 'next/image';
import NextImage from 'next/image';
import path from 'path';

import styles from './Image.module.css';

export async function Image(props: ImageProps) {
  'use cache';
  cacheLife('seconds');

  const newProps = { ...props };
  const src = props.src as string;
  const isLocalImage = !src.startsWith('http');

  if (isLocalImage && !props.width && !props.height) {
    const filePath = path.join(process.cwd(), 'public', src);
    const { width, height } = getImageSize(filePath);

    console.log({ width, height });

    newProps.width = width;
    newProps.height = height;
  }

  return <NextImage {...newProps} />;
}

function isStaticImport(src: ImageProps['src']): src is string {
  return typeof src === 'string';
}
