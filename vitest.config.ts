import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    test: {
        environment: "happy-dom",
        pool: "threads",
        testTimeout: 5000,
        resolveSnapshotPath(path, extension) {
            return path + extension;
        },
        include: ["tests/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["lcov", "text"],
            reportsDirectory: "./coverage",
        },
    },
    resolve: {
        alias: [
            {
                // Exact match — prevents subpath imports like
                // "@crestron/ch5-crcomlib/build_bundles/..." from also being aliased
                find: /^@crestron\/ch5-crcomlib$/,
                replacement: resolve(__dirname, "tests/crcomlib-shim.ts"),
            },
        ],
    },
});
