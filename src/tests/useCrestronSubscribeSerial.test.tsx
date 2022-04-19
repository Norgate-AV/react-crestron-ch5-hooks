import { renderHook } from "@testing-library/react/pure";
import * as CrComLib from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeSerial } from "../hooks/useCrestronSubscribeSerial";
import { SerialStateCallback } from "../types";

function setup() {
    const signalType = CrestronCH5.SignalType.Serial;
    const signalName = "ToInfinityAndBeyond";
    const callback: SerialStateCallback = (value, signalName) => {
        console.log(`Signal: ${signalName}, New Value: ${value}`);
    };

    const subscribeState = jest.spyOn(CrComLib, "subscribeState");
    const unsubscribeState = jest.spyOn(CrComLib, "unsubscribeState");

    return {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    };
}

describe("useCrestronSubscribeSerial", () => {
    const { signalType, signalName, callback, subscribeState } = setup();

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeSerial(signalName, callback),
        );

        expect(result.current).toEqual([""]);
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
});
