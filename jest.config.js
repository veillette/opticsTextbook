module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/scripts/tests/**/*.test.js',
    '**/scripts/tests/**/test_*.js'
  ],
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/tests/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};
