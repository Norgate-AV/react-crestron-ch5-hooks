import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeDigitalCollection } from "../hooks";
import { Digital } from "../types";
import { setupSubscribeTest } from "./setupSubscribeTest";

describe("useCrestronSubscribeDigitalCollection", () => {
    const { signalType, signalName, callback, subscribeState } =
        setupSubscribeTest<Digital>(CrestronCH5.SignalType.Digital, [
            "ToInfinityAndBeyond",
            "LovelyJubley",
            "IllBeBack",
        ]);

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeDigitalCollection(
                signalName as string[],
                callback,
            ),
        );

        expect(result.current).toEqual(
            Array.from<Digital>({ length: signalName.length }).fill(false),
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
