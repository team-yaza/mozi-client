const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: '.',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  // moduleDirectories: ['node_modules', '<rootDir>/'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/shared/(.*)': '<rootDir>/src/shared/$1',
    '@/services/(.*)': '<rootDir>/src/services/$1',
    '@/pages/(.*)': '<rootDir>/src/pages/$1',
    '@/store/(.*)': '<rootDir>/src/store/$1',
    '@/tests/(.*)': '<rootDir>/src/tests/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '@/hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@/styles/(.*)': '<rootDir>/src/styles/$1',
  },
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);
