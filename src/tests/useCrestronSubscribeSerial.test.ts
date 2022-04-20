import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeSerial } from "../hooks";
import { Serial } from "../types";
import { setupSubscribeTest } from "./setupSubscribeTest";

describe("useCrestronSubscribeSerial", () => {
    const { signalType, signalName, callback, subscribeState } =
        setupSubscribeTest<Serial>(
            CrestronCH5.SignalType.Serial,
            "ToInfinityAndBeyond",
        );

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeSerial(signalName as string, callback),
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
