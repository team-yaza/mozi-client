const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  // moduleDirectories: ['node_modules', '<rootDir>/'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@/components/(.*)': '<rootDir>/components/$1',
    '@/shared/(.*)': '<rootDir>/shared/$1',
    '@/services/(.*)': '<rootDir>/services/$1',
    '@/pages/(.*)': '<rootDir>/pages/$1',
    '@/store/(.*)': '<rootDir>/store/$1',
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/utils/(.*)': '<rootDir>/utils/$1',
    '@/hooks/(.*)': '<rootDir>/hooks/$1',
    '@/styles/(.*)': '<rootDir>/styles/$1',
  },
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);
