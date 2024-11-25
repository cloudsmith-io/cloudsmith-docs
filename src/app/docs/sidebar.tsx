import Link from 'next/link';

import { getSidebarStructure } from '../../utils/api-schema';

export async function Sidebar() {
  const structure = await getSidebarStructure();

  return (
    <nav>
      {structure.map((section) => (
        <ul key={section.name}>
          <strong>{section.name}</strong>
          <ul>
            {section.items.map((item) => {
              return (
                <li key={`${item.path}-${item.method}`}>
                  <Link href={`/`}>
                    <span>{item.method.toUpperCase()}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </ul>
      ))}
    </nav>
  );
}
