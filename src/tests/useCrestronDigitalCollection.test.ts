import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronDigitalCollection } from "../hooks";
import { Digital, IDigitalSignal } from "../types";
import { setupTest, signalNames } from "./helpers";

describe("useCrestronDigitalCollection", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Digital>(CrestronCH5.SignalType.Digital, signalNames);

    let hook: RenderHookResult<IDigitalSignal[], unknown> | null = null;
    let signals: IDigitalSignal[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronDigitalCollection(signalName as string[], callback),
        );

        signals = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IDigitalSignal>({ length: signalName.length }).fill({
                state: {
                    value: false,
                },
                action: {
                    setValue: expect.any(Function),
                    push: expect.any(Function),
                    release: expect.any(Function),
                    click: expect.any(Function),
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
            const { action } = signals[index];

            act(() => {
                action.setValue(true);
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                true,
            );

            expect(publishEvent).toHaveBeenCalledTimes(1);
            publishEvent.mockClear();

            act(() => {
                action.setValue(false);
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                false,
            );

            expect(publishEvent).toHaveBeenCalledTimes(1);
            publishEvent.mockClear();

            act(() => {
                action.push();
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                true,
            );
            expect(publishEvent).toHaveBeenCalledTimes(1);
            publishEvent.mockClear();

            act(() => {
                action.release();
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                false,
            );

            expect(publishEvent).toHaveBeenCalledTimes(1);
            publishEvent.mockClear();

            act(() => {
                action.click();
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                true,
            );
            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                false,
            );

            expect(publishEvent).toHaveBeenCalledTimes(2);
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
