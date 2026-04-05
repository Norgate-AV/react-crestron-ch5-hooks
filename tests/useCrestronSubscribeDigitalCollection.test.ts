import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import { useCrestronSubscribeDigitalCollection } from "../src/hooks/index.js";
import { Digital, IDigitalState } from "../src/@types/index.js";
import { setupSubscribeTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeDigitalCollection", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Digital>("boolean", signalNames);

    let hook: RenderHookResult<IDigitalState[], unknown> | null = null;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeDigitalCollection(
                signalName as string[],
                callback,
            ),
        );
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IDigitalState>({ length: signalName.length }).fill({
                value: false,
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
                value: Digital,
            ) => void;

            act(() => {
                handler(true);
            });

            expect(hook!.result.current[index]!.value).toBe(true);
            expect(callback).toHaveBeenCalledWith(true, name);
            expect(callback).toHaveBeenCalledTimes(1);
            callback.mockClear();
        });
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeDigitalCollection(signalName as string[]),
        );

        expect(result.current.every((s) => s.value === false)).toBe(true);
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
});
