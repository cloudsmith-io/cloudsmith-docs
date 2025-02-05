import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.mdx?$': '<rootDir>/src/lib/test/noop.js',
  },
};

export default createJestConfig(config);
