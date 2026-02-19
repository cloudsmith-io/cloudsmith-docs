import { getContentSecurityPolicyHeaderValue } from './csp';

describe('lib', () => {
  describe('csp.ts', () => {
    describe('getContentSecurityPolicyHeaderValue()', () => {
      test('returns a trimmed string', () => {
        const result = getContentSecurityPolicyHeaderValue();
        expect(result).toBe(result.trim());
      });

      test('includes default-src self', () => {
        const result = getContentSecurityPolicyHeaderValue();
        expect(result).toContain("default-src 'self'");
      });

      test('includes required script-src sources', () => {
        const result = getContentSecurityPolicyHeaderValue();
        expect(result).toContain("'unsafe-inline'");
        expect(result).toContain("'wasm-unsafe-eval'");
        expect(result).toContain('https://simple.cloudsmith.com');
        expect(result).toContain('https://va.vercel-scripts.com');
      });

      test('includes required connect-src sources', () => {
        const result = getContentSecurityPolicyHeaderValue();
        expect(result).toContain('https://api.cloudsmith.io');
        expect(result).toContain('https://queue.simpleanalyticscdn.com');
        expect(result).toContain('https://simple.cloudsmith.io');
        expect(result).toContain('https://simple.cloudsmith.com');
      });

      test('sets frame-src and object-src to none', () => {
        const result = getContentSecurityPolicyHeaderValue();
        expect(result).toContain("frame-src 'none'");
        expect(result).toContain("object-src 'none'");
      });

      test('sets base-uri to none', () => {
        const result = getContentSecurityPolicyHeaderValue();
        expect(result).toContain("base-uri 'none'");
      });

      test('deduplicates values within a directive', () => {
        const result = getContentSecurityPolicyHeaderValue();
        const scriptSrcMatch = result.match(/script-src ([^;]+)/);
        expect(scriptSrcMatch).not.toBeNull();
        const values = scriptSrcMatch![1].trim().split(' ');
        const unique = new Set(values);
        expect(values.length).toBe(unique.size);
      });
    });
  });
});
