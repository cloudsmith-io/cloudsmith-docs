import imageSize from 'image-size';
import { unstable_cacheLife as cacheLife } from 'next/cache';
import { ImageProps } from 'next/image';
import path from 'path';

/**
 * Asynchronously retrieves the dimensions (width and height) of an image.
 *
 * This function uses caching to improve performance. If the image is a local image
 * (i.e., the source does not start with 'http'), and the width and height are not
 * provided in the props, it will determine the dimensions by reading the image file.
 *
 * @param props - The properties of the image, including the source URL or path.
 * @returns An object containing the width and height of the image, or undefined if
 * the dimensions cannot be determined.
 */
export const getImageSize = async (props: ImageProps) => {
  'use cache';
  cacheLife('weeks');

  const src = props.src as string;
  const isLocalImage = !src.startsWith('http');

  // Height and width is required for local images
  if (isLocalImage && !props.width && !props.height) {
    const filePath = path.join(process.cwd(), 'public', src);
    const { width, height } = imageSize(filePath);

    return { width, height };
  }

  return { width: undefined, height: undefined };
};
