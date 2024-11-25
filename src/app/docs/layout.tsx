import { Sidebar } from './sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav>
        <Sidebar />
      </nav>
      <article>{children}</article>
    </main>
  );
}
