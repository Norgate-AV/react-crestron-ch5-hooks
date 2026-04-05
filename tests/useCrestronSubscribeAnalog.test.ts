import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import { useCrestronSubscribeAnalog } from "../src/hooks/index.js";
import { Analog, IAnalogState } from "../src/@types/index.js";
import { setupSubscribeTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeAnalog", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Analog>("number", signalNames[0] as string);

    let hook: RenderHookResult<[IAnalogState], unknown> | null = null;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeAnalog(signalName as string, callback),
        );
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: 0,
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

    it("should update state and invoke callback when the signal value changes", () => {
        const handler = subscribeState.mock.calls[0]![2] as (
            value: Analog,
        ) => void;

        act(() => {
            handler(100);
        });

        expect(hook!.result.current[0].value).toBe(100);
        expect(callback).toHaveBeenCalledWith(100, signalName as string);
        expect(callback).toHaveBeenCalledTimes(1);
        callback.mockClear();
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeAnalog(signalName as string),
        );

        expect(result.current[0].value).toBe(0);
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
