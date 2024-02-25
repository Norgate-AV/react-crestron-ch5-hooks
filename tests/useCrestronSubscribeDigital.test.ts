import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeDigital } from "../src/hooks/index.js";
import { Digital, IDigitalState } from "../src/@types/index.js";
import { setupSubscribeTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeDigital", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Digital>(
        CrestronCH5.SignalType.Digital,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[IDigitalState], unknown> | null = null;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeDigital(signalName as string, callback),
        );
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: false,
                }),
            ]),
        );
    });

    it("should call CrComLib.subscribeState() correctly", () => {
        expect(subscribeState).toHaveBeenCalledWith(
            signalType,
            signalName,
            expect.any(Function),
        );

        expect(subscribeState).toHaveBeenCalledTimes(1);
        expect(subscribeState).toHaveReturnedWith(expect.any(String));
    });

    it("should call CrComLib.unsubscribeState() correctly on unmount", () => {
        act(() => {
            hook?.unmount();
        });

        expect(unsubscribeState).toHaveBeenCalledWith(
            signalType,
            signalName,
            expect.any(String),
        );

        expect(unsubscribeState).toHaveBeenCalledTimes(1);
    });
});
