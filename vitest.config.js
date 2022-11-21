import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tools/vitestSetup.ts",
        coverage: {
            provider: "c8",
        },
    },
});
