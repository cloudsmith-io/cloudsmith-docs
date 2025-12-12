import { OpenAPIV3 } from 'openapi-types';

import { parseSchemas, toMenuItems, toOperations } from './parse';

describe('lib', () => {
  describe('swagger', () => {
    describe('parse.ts', () => {
      describe('parseSchemas', () => {
        test('it dynamically parses all schema files with versionAlias', async () => {
          const schemas = await parseSchemas();
          expect(schemas.length).toBeGreaterThanOrEqual(2);

          // Should have schemas with version aliases
          const versions = schemas.map((s) => s.version).sort();
          expect(versions).toContain('v1');
          expect(versions).toContain('v2');

          // Each schema should have the expected structure
          for (const { schema, version } of schemas) {
            expect(schema.openapi).toMatch(/^3\.0\./);
            expect(schema.info).toBeDefined();
            expect(schema.paths).toBeDefined();
            expect(version).toBeTruthy();
          }
        });
      });

      describe('toOperations', () => {
        test('it creates flat array of operation objects from multiple schemas with correct versions', async () => {
          const schemas = await parseSchemas();
          const result = toOperations(schemas);
          expect(result.length).toBeGreaterThan(10);

          // Check that operations have correct version information
          const uniqueVersions = Array.from(new Set(result.map((op) => op.version)));
          expect(uniqueVersions.length).toBeGreaterThanOrEqual(2);
          expect(uniqueVersions).toContain('v1');
          expect(uniqueVersions).toContain('v2');

          // Find a specific operation from v2 (policies are v2 only)
          const policyOperation = result.find((op) => op.operationId === 'workspaces_policies_list');
          expect(policyOperation).toBeDefined();
          expect(policyOperation?.version).toBe('v2');
          expect(policyOperation?.path).toMatch(/^\/workspaces/);

          // Verify all operations have required fields
          for (const operation of result) {
            expect(operation.version).toBeTruthy();
            expect(operation.path).toBeTruthy();
            expect(operation.method).toBeTruthy();
            expect(operation.slug).toBeTruthy();
            expect(operation.title).toBeTruthy();
            expect(operation.menuSegments).toBeInstanceOf(Array);
          }
        });

        test('it throws error for duplicate paths between schemas', () => {
          // Create mock schemas with duplicate paths
          const mockSchemas = [
            {
              version: 'v1',
              schema: {
                openapi: '3.0.0',
                info: { title: 'Test API', version: '1.0.0', versionAlias: 'v1' },
                paths: {
                  '/test': {
                    get: {
                      operationId: 'test_get_v1',
                      responses: { '200': { description: 'Success' } },
                    },
                  },
                },
              } as OpenAPIV3.Document,
            },
            {
              version: 'v2',
              schema: {
                openapi: '3.0.0',
                info: { title: 'Test API', version: '2.0.0', versionAlias: 'v2' },
                paths: {
                  '/test': {
                    get: {
                      operationId: 'test_get_v2',
                      responses: { '200': { description: 'Success' } },
                    },
                  },
                },
              } as OpenAPIV3.Document,
            },
          ];

          expect(() => toOperations(mockSchemas)).toThrow('Duplicate API endpoint detected: GET /test');
        });
      });

      describe('toMenuItems', () => {
        test('it creates menu items from multiple schemas operations', async () => {
          const schemas = await parseSchemas();
          const operations = toOperations(schemas);
          const result = toMenuItems(operations);

          // Should have operations from multiple versions
          expect(result.length).toBeGreaterThan(0);

          // Check that we have some operations that would be from v2 (like Policies)
          const workspacesItem = result.find((res) => res.title === 'Workspaces Policies');
          expect(workspacesItem).toBeDefined();

          // Verify menu structure
          for (const item of result) {
            expect(item.title).toBeTruthy();
            if (item.path) {
              expect(item.path).toMatch(/^\/api\//);
            }
            if (item.children) {
              expect(item.children).toBeInstanceOf(Array);
            }
          }
        });

        test('it skips flattening of some menu items', async () => {
          const schemas = await parseSchemas();
          const operations = toOperations(schemas);
          const result = toMenuItems(operations);

          // Do not flatten broadcasts
          const broadcastsFlattened = result.find((res) => res.title === 'Broadcasts Create Broadcast Token');
          expect(broadcastsFlattened).not.toBeDefined();

          const broadcastsUnflattened = result.find((res) => res.title === 'Broadcasts');
          expect(broadcastsUnflattened).toBeDefined();
        });
      });
    });
  });
});
