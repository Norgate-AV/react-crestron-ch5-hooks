import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSerial } from "../src/hooks/index.js";
import { ISerialSignal, Serial } from "../src/@types/index.js";
import { setupTest, signalNames } from "./helpers/index.js";

describe("useCrestronSerial", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Serial>(
        CrestronCH5.SignalType.Serial,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[ISerialSignal], unknown> | null = null;
    let signal: ISerialSignal;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSerial(signalName as string, callback),
        );

        [signal] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    state: {
                        value: "",
                    },
                    action: {
                        setValue: expect.any(Function) as (
                            value: string,
                        ) => void,
                    },
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

    it("should call CrComLib.publishEvent() correctly", () => {
        act(() => {
            signal.action.setValue("100");
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            "100",
        );

        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();
    });

    it("should update state and invoke callback when the signal value changes", () => {
        const handler = subscribeState.mock.calls[0]![2] as (
            value: Serial,
        ) => void;

        act(() => {
            handler("hello");
        });

        expect(hook!.result.current[0].state.value).toBe("hello");
        expect(callback).toHaveBeenCalledWith("hello", signalName as string);
        expect(callback).toHaveBeenCalledTimes(1);
        callback.mockClear();
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronSerial(signalName as string),
        );

        expect(result.current[0].state.value).toBe("");
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
