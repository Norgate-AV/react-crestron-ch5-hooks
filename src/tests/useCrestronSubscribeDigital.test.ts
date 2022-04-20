import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeDigital } from "../hooks";
import { Digital } from "../types";
import { setupSubscribeTest } from "./setupSubscribeTest";

describe("useCrestronSubscribeDigital", () => {
    const { signalType, signalName, callback, subscribeState } =
        setupSubscribeTest<Digital>(
            CrestronCH5.SignalType.Digital,
            "ToInfinityAndBeyond",
        );

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeDigital(signalName as string, callback),
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
