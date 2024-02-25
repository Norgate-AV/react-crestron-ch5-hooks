import * as CrComLib from "@crestron/ch5-crcomlib";
import { vi } from "vitest";
import { StateCallback } from "../../src/@types/index.js";

export function setupSubscribeTest<T>(
    signalType: string,
    signalName: string | string[],
) {
    const callback: StateCallback<T> = (value, signalName) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`Signal: ${signalName}, New Value: [${value}]`);
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
