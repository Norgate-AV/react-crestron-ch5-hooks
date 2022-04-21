import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSerial } from "../hooks";
import { ISerialSignal, Serial } from "../types";
import { setupTest, signalNames } from "./helpers";

describe("useCrestronSerial", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Serial>(CrestronCH5.SignalType.Serial, signalNames[0]);

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
                        setValue: expect.any(Function),
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
