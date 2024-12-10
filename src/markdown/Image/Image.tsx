import { unstable_cacheLife as cacheLife } from 'next/cache';
import NextImage, { ImageProps } from 'next/image';

import { getImageSize } from '@/lib/image-size/util';

export const Image = async (imageProps: ImageProps) => {
  'use cache';
  cacheLife('weeks');

  const dimensions = await getImageSize(imageProps);

  return <NextImage {...imageProps} {...dimensions} />;
};
