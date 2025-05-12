import { scanURLs, printErrors, validateFiles } from 'next-validate-link';
import fg from 'fast-glob';
 
const scanned = await scanURLs({
  preset: 'next'
});
 
printErrors(
  await validateFiles(await fg('content/**/*.{md,mdx}'), {
    scanned,
  }),
  true, // exit with code 1 if errors detected
);