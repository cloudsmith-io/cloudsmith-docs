// components/CodeBlock/RemoteCodeBlock.tsx
// This component wraps your existing CodeBlock to add data fetching.

import { CodeBlock } from './CodeBlock'; // Using path alias to import from your CodeBlock module

// Define the types for the component's props
interface Props {
  src: string;
  lang: string;
  header?: boolean;
  // This allows passing any other props that your original CodeBlock might accept
  [key: string]: unknown; // Use 'unknown' instead of 'any' for better type safety
}

/**
 * A server component that fetches code from a remote URL and then
 * renders it using your existing CodeBlock component.
 */
export async function RemoteCodeBlock({ src, lang, ...props }: Props) {
  let codeContent = '';
  let currentLang = lang; // Use a mutable variable for language
  let error = null;

  try {
    // Fetch the code from the provided URL.
    // Using { cache: 'no-store' } ensures you get the latest version on each request.
    // For better performance, you could use revalidation: { next: { revalidate: 3600 } }
    const response = await fetch(src, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch code: ${response.status} ${response.statusText}`);
    }

    codeContent = await response.text();
  } catch (err: unknown) { // Catch the error as 'unknown'
    // Check if the caught object is an instance of Error to safely access .message
    if (err instanceof Error) {
        error = err.message;
    } else {
        error = 'An unknown error occurred while fetching the code.';
    }
    console.error("Error fetching remote code:", err);
    // Render a simple error message if fetching fails
    codeContent = `Error: Could not load code from ${src}\n\n${error}`;
    currentLang = 'text'; // Set lang to 'text' for the error message
  }

  // Render your existing CodeBlock with the fetched content.
  // The 'children' prop for CodeBlock will be the fetched code string.
  // All other props like 'lang' and 'header' are passed through.
  return (
    <CodeBlock lang={currentLang} {...props}>
      {codeContent}
    </CodeBlock>
  );
}
