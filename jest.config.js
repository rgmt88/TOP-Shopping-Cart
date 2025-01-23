export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use Babel for JavaScript and JSX transformation
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Load Jest DOM matchers
  };
  