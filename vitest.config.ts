import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        testTimeout: 60000,
        resolveSnapshotPath(path, extension) {
            return path + extension;
        },
        include: ["tests/**/*.test.ts"],
    },
});
