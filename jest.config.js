// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    setupFilesAfterEnv: ["./tools/jest-setup.js"],
    transform: {
        "\\.[jt]sx?$": "./tools/esbuild-jsx.js",
    },
    testEnvironment: "jsdom",
    collectCoverage: true,
};

module.exports = config;
