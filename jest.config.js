const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@/components/(.*)': '<rootDir>/components/$1',
    '@/shared/(.*)': '<rootDir>/shared/$1',
    '@/pages/(.*)': '<rootDir>/pages/$1',
    '@/store/(.*)': '<rootDir>/store/$1',
  },
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);
