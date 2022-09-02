// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    setupFilesAfterEnv: ['./src/services/jest-setup.js'],
    transform: {
        "\\.[jt]sx?$": "./src/services/esbuild-jsx.js",
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    // coverageProvider: 'v8'
};

module.exports = config;