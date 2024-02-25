import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronDigital } from "../src/hooks/index.js";
import { Digital, IDigitalSignal } from "../src/@types/index.js";
import { setupTest, signalNames } from "./helpers/index.js";

describe("useCrestronDigital", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Digital>(
        CrestronCH5.SignalType.Digital,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[IDigitalSignal], unknown> | null = null;
    let signal: IDigitalSignal;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronDigital(signalName as string, callback),
        );

        [signal] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    state: {
                        value: false,
                    },
                    action: {
                        setValue: expect.any(Function) as (
                            value: boolean,
                        ) => void,
                        push: expect.any(Function) as () => void,
                        release: expect.any(Function) as () => void,
                        click: expect.any(Function) as () => void,
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
            signal.action.setValue(true);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            signal.action.setValue(false);
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );

        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            signal.action.push();
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            signal.action.release();
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );

        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            signal.action.click();
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );

        expect(publishEvent).toHaveBeenCalledTimes(2);
        publishEvent.mockClear();
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
