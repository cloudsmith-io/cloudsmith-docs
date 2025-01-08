import { createSlug, parseMenuSegments } from './util';

describe('lib', () => {
  describe('swagger', () => {
    describe('util.ts', () => {
      describe('parseMenuSegments', () => {
        test('it parses the needed operationIDs', async () => {
          const mapping = [
            { from: 'orgs_list', to: ['Orgs', 'List'] },
            { from: 'orgs_deny-policy_list', to: ['Deny Policy', 'List'] },
            { from: 'orgs_deny-policy_partial_update', to: ['Deny Policy', 'Partial Update'] },
            { from: 'orgs_license-policy_evaluation_list', to: ['License Policy', 'Evaluation', 'List'] },
          ];
          for (const item of mapping) {
            expect(parseMenuSegments(item.from)).toEqual(item.to);
          }
        });
      });
      describe('createSlug', () => {
        test('it creates proper slug', async () => {
          const mapping = [
            { from: ['Orgs', 'List'], to: '/api/orgs/list' },
            { from: ['Deny Policy', 'List'], to: '/api/deny-policy/list' },
            { from: ['Deny Policy', 'Partial Update'], to: '/api/deny-policy/partial-update' },
            { from: ['License Policy', 'Evaluation', 'List'], to: '/api/license-policy/evaluation/list' },
          ];
          for (const item of mapping) {
            expect(createSlug(item.from)).toEqual(item.to);
          }
        });
      });
    });
  });
});
