import * as CrComLib from "@crestron/ch5-crcomlib";
import { vi } from "vitest";

export function setupPublishTest(
    signalType: string,
    signalName: string | string[],
) {
    const publishEvent = vi.spyOn(CrComLib, "publishEvent");

    return {
        signalType,
        signalName,
        publishEvent,
    };
}
