import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronAnalog } from "../src/hooks/index.js";
import { Analog, IAnalogSignal } from "../src/@types/index.js";
import { setupTest, signalNames } from "./helpers/index.js";

describe("useCrestronAnalog", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Analog>(
        CrestronCH5.SignalType.Analog,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[IAnalogSignal], unknown> | null = null;
    let signal: IAnalogSignal;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronAnalog(signalName as string, callback),
        );

        [signal] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    state: {
                        value: 0,
                    },
                    action: {
                        setValue: expect.any(Function) as () => void,
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
            signal.action.setValue(100);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, 100);
        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();
    });

    it("should update state and invoke callback when the signal value changes", () => {
        const handler = subscribeState.mock.calls[0]![2] as (
            value: Analog,
        ) => void;

        act(() => {
            handler(100);
        });

        expect(hook!.result.current[0].state.value).toBe(100);
        expect(callback).toHaveBeenCalledWith(100, signalName as string);
        expect(callback).toHaveBeenCalledTimes(1);
        callback.mockClear();
    });

    it("should work without a callback", () => {
        const { result } = renderHook(() =>
            useCrestronAnalog(signalName as string),
        );

        expect(result.current[0].state.value).toBe(0);
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
