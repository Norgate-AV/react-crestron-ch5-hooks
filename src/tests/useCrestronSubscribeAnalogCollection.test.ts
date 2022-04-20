import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeAnalogCollection } from "../hooks";
import { Analog } from "../types";
import { setupSubscribeTest } from "./setupSubscribeTest";

describe("useCrestronSubscribeAnalogCollection", () => {
    const { signalType, signalName, callback, subscribeState } =
        setupSubscribeTest<Analog>(CrestronCH5.SignalType.Analog, [
            "ToInfinityAndBeyond",
            "LovelyJubley",
            "IllBeBack",
        ]);

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeAnalogCollection(
                signalName as string[],
                callback,
            ),
        );

        expect(result.current).toEqual(
            Array.from<Analog>({ length: signalName.length }).fill(0),
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
});
