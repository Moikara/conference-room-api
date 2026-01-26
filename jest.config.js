/** @type {import('jest').Config} */
module.exports = {
  // Test environment for API + service tests
  testEnvironment: "node",

  // Where Jest should look for tests
  roots: ["<rootDir>/tests"],

  // Match all test files
  testMatch: [
    "**/?(*.)+(test).[jt]s"
  ],

  // Automatically reset mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Coverage
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/app.js",            // app bootstrap
    "!src/server.js",         // http listener
    "!src/**/index.js"        // barrel files
  ],

  coverageDirectory: "coverage",

  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },

  // Better error output
  verbose: true,

  // Slow test detection
  slowTestThreshold: 5,

  // Test timeout (integration tests + fake timers safe)
  testTimeout: 10000,

  // File extensions
  moduleFileExtensions: ["js", "json"],

  // Ignore build artifacts
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/"
  ],

  // Optional: nicer diffs
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true
  }
};
