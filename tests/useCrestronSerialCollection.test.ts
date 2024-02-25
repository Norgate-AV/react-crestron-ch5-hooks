import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSerialCollection } from "../src/hooks/index.js";
import { ISerialSignal, Serial } from "../src/@types/index.js";
import { setupTest, signalNames } from "./helpers/index.js";

describe("useCrestronSerialCollection", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Serial>(CrestronCH5.SignalType.Serial, signalNames);

    let hook: RenderHookResult<ISerialSignal[], unknown> | null = null;
    let signals: ISerialSignal[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSerialCollection(signalName as string[], callback),
        );

        signals = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<ISerialSignal>({ length: signalName.length }).fill({
                state: {
                    value: "",
                },
                action: {
                    setValue: expect.any(Function) as (value: string) => void,
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
            const { action } = signals[index] as ISerialSignal;

            act(() => {
                action.setValue("100");
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                "100",
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
