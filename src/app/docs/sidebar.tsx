import Link from 'next/link';

import { getSidebarStructure } from '../../utils/api-schema';
import { Method } from '../_components/method/method';

export async function Sidebar() {
  const sidebar = await getSidebarStructure();

  return (
    <nav>
      {Object.entries(sidebar).map(([tag, tagEndpoints]) => (
        <ul key={tag}>
          <strong>{tag}</strong>
          <ul>
            {(tagEndpoints as any).map((path) => {
              const methods = Object.entries(path).filter(
                ([key]) => Object.keys(Method.Methods).indexOf(key) !== -1,
              );

              return (
                <li key={path.path}>
                  {methods.map(([method, value]) => (
                    <Link key={value.operationId} href={`/docs/${value.operationId}`}>
                      {value.summary}
                      <Method type={method as Method.Methods} />
                    </Link>
                  ))}
                </li>
              );
            })}
          </ul>
        </ul>
      ))}
    </nav>
  );
}
