export const getContentSecurityPolicyHeaderValue = () => {
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
    qualified: {
      'script-src': ['https://js.qualified.com'],
      'connect-src': ['wss://*.qualified.com', 'https://app.qualified.com'],
      'frame-src': ['https://app.qualified.com'],
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
