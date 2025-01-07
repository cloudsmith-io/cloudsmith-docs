import { operationSlug, parseMenuSegments } from './util';

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
      describe('operationSlug', () => {
        test('it creates proper slug', async () => {
          const mapping = [
            { from: ['Orgs', 'List'], to: '/api/orgs/list' },
            { from: ['Deny Policy', 'List'], to: '/api/deny-policy/list' },
            { from: ['Deny Policy', 'Partial Update'], to: '/api/deny-policy/partial-update' },
            { from: ['License Policy', 'Evaluation', 'List'], to: '/api/license-policy/evaluation/list' },
          ];
          for (const item of mapping) {
            expect(operationSlug(item.from)).toEqual(item.to);
          }
        });
      });
    });
  });
});
