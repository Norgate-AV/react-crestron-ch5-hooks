import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeAnalogCollection } from "../hooks";
import { Analog } from "../types";
import { setupSubscribeTest } from "./utils/setupSubscribeTest";
import { signalNames } from "./utils/signalNames";

describe("useCrestronSubscribeAnalogCollection", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Analog>(CrestronCH5.SignalType.Analog, signalNames);

    let hook: any = {};

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeAnalogCollection(
                signalName as string[],
                callback,
            ),
        );
    });

    it("should initialize correctly", () => {
        expect(hook.result.current).toEqual(
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

    it("should call CrComLib.unsubscribeState() correctly on unmount", () => {
        hook.unmount();

        expect(unsubscribeState).toHaveBeenCalledWith(
            signalType,
            expect.any(String),
            expect.any(String),
        );

        expect(unsubscribeState).toHaveBeenCalledTimes(signalName.length);
    });
});
