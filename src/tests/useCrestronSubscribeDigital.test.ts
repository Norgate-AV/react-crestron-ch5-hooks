import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeDigital } from "../hooks";
import { Digital } from "../types";
import { setupSubscribeTest } from "./utils/setupSubscribeTest";
import { signalNames } from "./utils/signalNames";

describe("useCrestronSubscribeDigital", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Digital>(
        CrestronCH5.SignalType.Digital,
        signalNames[0],
    );

    let hook: any = {};

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeDigital(signalName as string, callback),
        );
    });

    it("should initialize correctly", () => {
        expect(hook.result.current).toEqual([false]);
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
