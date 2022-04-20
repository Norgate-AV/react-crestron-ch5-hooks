import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeAnalog } from "../hooks";
import { Analog } from "../types";
import { setupSubscribeTest } from "./setupSubscribeTest";

describe("useCrestronSubscribeAnalog", () => {
    const { signalType, signalName, callback, subscribeState } =
        setupSubscribeTest<Analog>(
            CrestronCH5.SignalType.Analog,
            "ToInfinityAndBeyond",
        );

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeAnalog(signalName as string, callback),
        );

        expect(result.current).toEqual([0]);
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
