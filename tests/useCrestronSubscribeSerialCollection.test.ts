import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import { useCrestronSubscribeSerialCollection } from "../src/hooks/index.js";
import { ISerialState, Serial } from "../src/@types/index.js";
import { setupSubscribeTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeSerialCollection", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
        getState,
    } = setupSubscribeTest<Serial>("string", signalNames);

    let hook: RenderHookResult<ISerialState[], unknown> | null = null;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeSerialCollection(
                signalName as string[],
                callback,
            ),
        );
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<ISerialState>({ length: signalName.length }).fill({
                value: "",
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
                value: Serial,
            ) => void;

            act(() => {
                handler("hello");
            });

            expect(hook!.result.current[index]!.value).toBe("hello");
            expect(callback).toHaveBeenCalledWith("hello", name);
            expect(callback).toHaveBeenCalledTimes(1);
            callback.mockClear();
        });
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeSerialCollection(signalName as string[]),
        );

        expect(result.current.every((s) => s.value === "")).toBe(true);
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
        getState.mockReturnValue("hello");

        const { result } = renderHook(() =>
            useCrestronSubscribeSerialCollection(signalName as string[]),
        );

        expect(result.current).toEqual(
            Array.from<ISerialState>({ length: signalName.length }).fill({
                value: "hello",
            }),
        );

        getState.mockReturnValue(null);
    });
});
