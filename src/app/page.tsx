import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Frontpage</h1>
      <ul>
        <li>
          <Link href="/api">API</Link>
        </li>
        <li>
          <Link href="/test">Test Markdown</Link>
        </li>
      </ul>
      
    </>
  );
}
