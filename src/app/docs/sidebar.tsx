import { Method } from '@/components';
import { getSidebarStructure } from '@/lib/schema/api';

import { OperationLink } from './operation-link';

export async function Sidebar() {
  const sidebar = await getSidebarStructure();

  return (
    <nav>
      {Object.entries(sidebar).map(([tag, tagEndpoints]) => (
        <ul key={tag}>
          <strong>{tag}</strong>

          <ul>
            {(tagEndpoints as Array<unknown>).map((path) => {
              const methods = Object.entries(path as string).filter(
                ([key]) => Object.keys(Method.Methods).indexOf(key) !== -1,
              );

              return (
                <li key={path!.path}>
                  {methods.map(([method, value]) => (
                    <OperationLink
                      key={value.operationId}
                      method={method as Method.Methods}
                      href={`/docs/${value.operationId}`}
                      operationId={value.operationId}>
                      {value.summary}
                    </OperationLink>
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
