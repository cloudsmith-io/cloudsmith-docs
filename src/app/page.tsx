import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Frontpage</h1>
      <Link href="/api">API</Link>
    </>
  );
}
