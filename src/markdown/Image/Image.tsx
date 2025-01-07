import NextImage, { ImageProps } from 'next/image';

import { getImageSize } from '@/lib/image-size/util';

export const Image = async (imageProps: ImageProps) => {
  const dimensions = await getImageSize(imageProps);

  return <NextImage {...imageProps} {...dimensions} />;
};
