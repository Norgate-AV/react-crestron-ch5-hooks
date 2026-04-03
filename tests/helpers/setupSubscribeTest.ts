import * as CrComLib from "@crestron/ch5-crcomlib";
import { vi } from "vitest";

export function setupSubscribeTest<T>(
    signalType: string,
    signalName: string | string[],
) {
    const callback = vi.fn<(value: T, signalName?: string) => void>();

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
