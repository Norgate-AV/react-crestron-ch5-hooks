import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    test: {
        environment: "jsdom",
        testTimeout: 60000,
        resolveSnapshotPath(path, extension) {
            return path + extension;
        },
        include: ["tests/**/*.test.ts"],
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
