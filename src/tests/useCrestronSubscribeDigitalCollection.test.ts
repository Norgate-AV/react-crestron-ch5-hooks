import { renderHook } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronSubscribeDigitalCollection } from "../hooks";
import { Digital } from "../types";
import { setupSubscribeTest } from "./utils/setupSubscribeTest";
import { signalNames } from "./utils/signalNames";

describe("useCrestronSubscribeDigitalCollection", () => {
    const {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupSubscribeTest<Digital>(
        CrestronCH5.SignalType.Digital,
        signalNames,
    );

    let hook: any = {};

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronSubscribeDigitalCollection(
                signalName as string[],
                callback,
            ),
        );
    });

    it("should initialize correctly", () => {
        expect(hook.result.current).toEqual(
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
