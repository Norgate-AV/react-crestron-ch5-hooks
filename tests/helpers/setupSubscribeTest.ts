import * as CrComLib from "@crestron/ch5-crcomlib";
import { vi } from "vitest";
import { StateCallback } from "../../src/@types/index.js";

export function setupSubscribeTest<T>(
    signalType: string,
    signalName: string | string[],
) {
    const callback: StateCallback<T> = (_value, _signalName) => {
        // no-op
    };

    const subscribeState = vi.spyOn(CrComLib, "subscribeState");
    const unsubscribeState = vi.spyOn(CrComLib, "unsubscribeState");

    return {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    };
}
