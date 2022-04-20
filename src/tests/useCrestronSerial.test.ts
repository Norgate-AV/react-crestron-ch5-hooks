import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSerial } from "../hooks";
import { ISerialEventAction, Serial } from "../types";
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

    let hook: RenderHookResult<[Serial, ISerialEventAction], unknown> | null =
        null;

    let state: Serial;
    let action: ISerialEventAction;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSerial(signalName as string, callback),
        );

        [state, action] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                state,
                expect.objectContaining({
                    setValue: expect.any(Function),
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
