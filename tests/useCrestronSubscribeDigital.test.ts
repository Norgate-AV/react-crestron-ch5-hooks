import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
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
        getState,
    } = setupSubscribeTest<Digital>("boolean", signalNames[0] as string);

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

    it("should update state and invoke callback when the signal value changes", () => {
        const handler = subscribeState.mock.calls[0]![2] as (
            value: Digital,
        ) => void;

        act(() => {
            handler(true);
        });

        expect(hook!.result.current[0].value).toBe(true);
        expect(callback).toHaveBeenCalledWith(true, signalName as string);
        expect(callback).toHaveBeenCalledTimes(1);
        callback.mockClear();
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeDigital(signalName as string),
        );

        expect(result.current[0].value).toBe(false);
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

    it("should call CrComLib.getState() with the correct signal type and name on mount", () => {
        expect(getState).toHaveBeenCalledWith(signalType, signalName);
    });

    it("should initialize with the value from getState when a prior state exists", () => {
        getState.mockReturnValueOnce(true);

        const { result } = renderHook(() =>
            useCrestronSubscribeDigital(signalName as string),
        );

        expect(result.current[0].value).toBe(true);
    });
});
