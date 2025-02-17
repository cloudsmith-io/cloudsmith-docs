import { createSlug, createTitle, parseMenuSegments } from './util';

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
            { from: ['Orgs', 'List'], to: 'orgs/list' },
            { from: ['Deny Policy', 'List'], to: 'deny-policy/list' },
            { from: ['Deny Policy', 'Partial Update'], to: 'deny-policy/partial-update' },
            { from: ['License Policy', 'Evaluation', 'List'], to: 'license-policy/evaluation/list' },
          ];
          for (const item of mapping) {
            expect(createSlug(item.from)).toEqual(item.to);
          }
        });
      });
      describe('createTItle', () => {
        test('it creates proper slug', async () => {
          const mapping = [
            { from: ['Audit', 'Log', 'Namespace', 'List'], to: 'Audit Log Namespace List' },
            { from: ['Badges', 'Version', 'List'], to: 'Badges Version List' },
            { from: ['Billing', 'Account', 'Status'], to: 'Billing Account Status' },
            { from: ['Billing', 'Invoices'], to: 'Billing Invoices' },
          ];
          for (const item of mapping) {
            expect(createTitle(item.from)).toEqual(item.to);
          }
        });
      });
    });
  });
});
