import { renderHook } from "@testing-library/react/pure";
import * as CrComLib from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeDigital } from "../hooks/useCrestronSubscribeDigital";
import { DigitalStateCallback } from "../types";

function setup() {
    const signalType = CrestronCH5.SignalType.Digital;
    const signalName = "ToInfinityAndBeyond";
    const callback: DigitalStateCallback = (value, signalName) => {
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

describe("useCrestronSubscribeDigital", () => {
    const { signalType, signalName, callback, subscribeState } = setup();

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeDigital(signalName, callback),
        );

        expect(result.current).toEqual([false]);
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
