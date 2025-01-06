import { parseMenuSegments } from './util';

describe('lib', () => {
  describe('swagger', () => {
    describe('util.ts', () => {
      describe('parseMenuSegments', () => {
        test('it parses the needed operationIDs', async () => {
          const mapping = {
            orgs_list: ['Orgs', 'List'],
            'orgs_deny-policy_list': ['Deny Policy', 'List'],
            'orgs_deny-policy_partial_update': ['Deny Policy', 'Partial Update'],
            'orgs_license-policy_evaluation_list': ['License Policy', 'Evaluation', 'List'],
          } as { [operationId: string]: string[] };
          for (const key in mapping) {
            expect(parseMenuSegments(key)).toEqual(mapping[key]);
          }
        });
      });
    });
  });
});
