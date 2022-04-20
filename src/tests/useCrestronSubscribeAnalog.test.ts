import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeAnalog } from "../hooks";
import { Analog } from "../types";
import { setupSubscribeTest } from "./utils/setupSubscribeTest";
import { signalNames } from "./utils/signalNames";

describe("useCrestronSubscribeAnalog", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Analog>(
        CrestronCH5.SignalType.Analog,
        signalNames[0],
    );

    let hook: any = {};

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeAnalog(signalName as string, callback),
        );
    });

    it("should initialize correctly", () => {
        expect(hook.result.current).toEqual([0]);
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

    it("should call CrComLib.unsubscribeState() correctly on unmount", () => {
        hook.unmount();

        expect(unsubscribeState).toHaveBeenCalledWith(
            signalType,
            signalName,
            expect.any(String),
        );

        expect(unsubscribeState).toHaveBeenCalledTimes(1);
    });
});
