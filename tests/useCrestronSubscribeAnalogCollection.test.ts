import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import { useCrestronSubscribeAnalogCollection } from "../src/hooks/index.js";
import { Analog, IAnalogState } from "../src/@types/index.js";
import { setupSubscribeTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeAnalogCollection", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
        getState,
    } = setupSubscribeTest<Analog>("number", signalNames);

    let hook: RenderHookResult<IAnalogState[], unknown> | null = null;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeAnalogCollection(
                signalName as string[],
                callback,
            ),
        );
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IAnalogState>({ length: signalName.length }).fill({
                value: 0,
            }),
        );
    });

    it("should call CrComLib.subscribeState() correctly", () => {
        expect(subscribeState).toHaveBeenCalledWith(
            signalType,
            expect.any(String),
            expect.any(Function),
        );

        expect(subscribeState).toHaveBeenCalledTimes(signalName.length);
        expect(subscribeState).toHaveReturnedWith(expect.any(String));
    });

    it("should update state and invoke callback when the signal value changes for each signalName", () => {
        const signalNamesArr = signalName as string[];

        signalNamesArr.forEach((name, index) => {
            const handler = subscribeState.mock.calls[index]![2] as (
                value: Analog,
            ) => void;

            act(() => {
                handler(100);
            });

            expect(hook!.result.current[index]!.value).toBe(100);
            expect(callback).toHaveBeenCalledWith(100, name);
            expect(callback).toHaveBeenCalledTimes(1);
            callback.mockClear();
        });
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeAnalogCollection(signalName as string[]),
        );

        expect(result.current.every((s) => s.value === 0)).toBe(true);
    });

    it("should call CrComLib.unsubscribeState() correctly on unmount", () => {
        act(() => {
            hook?.unmount();
        });

        expect(unsubscribeState).toHaveBeenCalledWith(
            signalType,
            expect.any(String),
            expect.any(String),
        );

        expect(unsubscribeState).toHaveBeenCalledTimes(signalName.length);
    });

    it("should call CrComLib.getState() with the correct signal type and name for each signal on mount", () => {
        const names = signalName as string[];

        names.forEach((name) => {
            expect(getState).toHaveBeenCalledWith(signalType, name);
        });
    });

    it("should initialize with the values from getState when prior states exist", () => {
        getState.mockReturnValue(42);

        const { result } = renderHook(() =>
            useCrestronSubscribeAnalogCollection(signalName as string[]),
        );

        expect(result.current).toEqual(
            Array.from<IAnalogState>({ length: signalName.length }).fill({
                value: 42,
            }),
        );

        getState.mockReturnValue(null);
    });
});
