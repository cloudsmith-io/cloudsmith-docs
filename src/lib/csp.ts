export const getContentSecurityPolicyHeaderValue = () => {
  const sentryReportUrl = process.env.SENTRY_SECURITY_REPORT_URL;

  const definitions: Record<string, Record<string, string[]>> = {
    defaults: {
      'default-src': [`'self'`],
      'script-src': [
        `'self'`,
        // Required for Next.js inline hydration scripts in static output
        `'unsafe-inline'`,
        // Required for syntax highlighting
        `'wasm-unsafe-eval'`,
      ],
      'style-src': [
        `'self'`,
        // Required for Next.js inline styles
        `'unsafe-inline'`,
      ],
      'img-src': [`'self'`, 'data:'],
      'connect-src': [`'self'`],
      'form-action': [`'self'`],
      'frame-src': [`'none'`],
      'font-src': [`'self'`],
      'child-src': [`'self'`],
      'media-src': [`'self'`],
      'object-src': [`'none'`],
      'base-uri': [`'none'`],
    },
    cloudsmith: {
      'connect-src': ['https://api.cloudsmith.io'],
    },
    simpleAnalytics: {
      'script-src': ['https://simple.cloudsmith.com'],
      'connect-src': [
        'https://queue.simpleanalyticscdn.com',
        'https://simple.cloudsmith.io',
        'https://simple.cloudsmith.com',
      ],
      'img-src': ['https://queue.simpleanalyticscdn.com', 'https://simple.cloudsmith.com'],
    },
    vercel: {
      'script-src': ['https://va.vercel-scripts.com'],
      'connect-src': ['https://va.vercel-scripts.com'],
    },
  };

  if (sentryReportUrl) {
    definitions.defaults['report-uri'] = [sentryReportUrl];
    definitions.defaults['report-to'] = ['csp-endpoint'];
  }

  const directives: Record<string, string[][]> = {};

  for (const source in definitions) {
    for (const directive in definitions[source]) {
      if (!directives[directive]) {
        directives[directive] = [];
      }
      directives[directive].push(definitions[source][directive]);
    }
  }

  let cspValue = '';

  for (const directive in directives) {
    const flattenedValues = Array.from(new Set(directives[directive].flat().filter(Boolean)));
    cspValue += `${directive} ${flattenedValues.join(' ')}; `;
  }

  return cspValue.trim();
};
