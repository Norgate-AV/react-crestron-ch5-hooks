import { renderHook } from "@testing-library/react";
import * as CrComLib from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeAnalog } from "../hooks/useCrestronSubscribeAnalog";

const signalType = CrestronCH5.SignalType.Analog;
const subscribeState = jest.spyOn(CrComLib, "subscribeState");
// const unsubscribeState = jest.spyOn(CrComLib, "unsubscribeState");
// type SubscribeStateCallback<T> = (value: T) => void;

describe("useCrestronSubscribeAnalog()", () => {
    beforeEach(() => {
        subscribeState.mockClear();
    });

    it("should not return null", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        expect(result.current).not.toBe(null);
    });

    it("should not return undefined", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        expect(result.current).not.toBe(undefined);
    });

    it("should return number array", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        expect(result.current).toEqual(expect.arrayContaining([0]));
    });

    it("should call subscribeState() once", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        expect(result.current).toEqual(expect.arrayContaining([0]));
        expect(subscribeState).toHaveBeenCalledTimes(1);
        expect(subscribeState).toHaveBeenCalledWith(
            signalType,
            "1",
            expect.any(Function),
        );
    });
});
