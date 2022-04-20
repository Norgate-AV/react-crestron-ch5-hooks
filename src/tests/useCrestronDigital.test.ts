import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronDigital } from "../hooks";
import { IDigitalAction, Digital } from "../types";
import { setupTest, signalNames } from "./helpers";

describe("useCrestronDigital", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Digital>(CrestronCH5.SignalType.Digital, signalNames[0]);

    let hook: RenderHookResult<[Digital, IDigitalAction], unknown> | null =
        null;

    let state: Digital;
    let action: IDigitalAction;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronDigital(signalName as string, callback),
        );

        [state, action] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                state,
                expect.objectContaining({
                    setValue: expect.any(Function),
                    push: expect.any(Function),
                    release: expect.any(Function),
                    click: expect.any(Function),
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
            action.setValue(true);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
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

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
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
