import { createRequire } from "module";
import type * as CrComLibTypes from "@crestron/ch5-crcomlib";

/**
 * Compatibility shim for @crestron/ch5-crcomlib v2.
 *
 * v2 changed the CJS bundle export from flat named exports (v1) to a
 * single `CrComLib` namespace: `module.exports.CrComLib = { subscribeState, ... }`.
 * Additionally, webpack v5 defines those properties as non-configurable getters,
 * so vi.spyOn cannot patch them directly on the real module object.
 *
 * This shim re-exports the functions as regular ES named exports so that:
 * - `import { subscribeState } from "@crestron/ch5-crcomlib"` works in hooks (via alias)
 * - `vi.spyOn(CrComLib, 'subscribeState')` works in tests (Vite's module namespace IS mutable)
 * - ESM live bindings propagate spy replacements to hook call sites
 *
 * createRequire is used to load the actual CJS bundle via Node.js (bypassing
 * Vite's alias to avoid circular resolution).
 */
const _require = createRequire(import.meta.url);
const { CrComLib } = _require(
    "@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js",
) as { CrComLib: typeof CrComLibTypes };

export const { subscribeState, unsubscribeState, publishEvent } = CrComLib;
