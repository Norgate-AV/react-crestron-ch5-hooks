import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronAnalogCollection } from "../src/hooks/index.js";
import { Analog, IAnalogSignal } from "../src/@types/index.js";
import { setupTest, signalNames } from "./helpers/index.js";

describe("useCrestronAnalogCollection", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Analog>(CrestronCH5.SignalType.Analog, signalNames);

    let hook: RenderHookResult<IAnalogSignal[], unknown> | null = null;
    let signals: IAnalogSignal[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronAnalogCollection(signalName as string[], callback),
        );

        signals = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IAnalogSignal>({ length: signalName.length }).fill({
                state: {
                    value: 0,
                },
                action: {
                    setValue: expect.any(Function) as (value: number) => void,
                },
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

    it("should call CrComLib.publishEvent() correctly for each signalName", () => {
        const signalNames = signalName as string[];

        signalNames.forEach((signalName, index) => {
            const { action } = signals[index] as IAnalogSignal;

            act(() => {
                action.setValue(100);
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                100,
            );

            expect(publishEvent).toHaveBeenCalledTimes(1);
            publishEvent.mockClear();
        });
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
