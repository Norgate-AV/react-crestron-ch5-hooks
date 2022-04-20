import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeSerialCollection } from "../hooks";
import { Serial } from "../types";
import { setupSubscribeTest } from "./setupSubscribeTest";

describe("useCrestronSubscribeSerialCollection", () => {
    const { signalType, signalName, callback, subscribeState } =
        setupSubscribeTest<Serial>(CrestronCH5.SignalType.Serial, [
            "ToInfinityAndBeyond",
            "LovelyJubley",
            "IllBeBack",
        ]);

    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            useCrestronSubscribeSerialCollection(
                signalName as string[],
                callback,
            ),
        );

        expect(result.current).toEqual(
            Array.from<Serial>({ length: signalName.length }).fill(""),
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
