import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishSerial } from "../hooks";
import { ISerialAction } from "../types";
import { setupPublishTest, signalNames } from "./helpers";

describe("useCrestronSubscribeSerial", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Serial,
        signalNames[0],
    );

    let hook: RenderHookResult<[ISerialAction], unknown> | null = null;
    let action: ISerialAction;

    beforeAll(() => {
        hook = renderHook(() => useCrestronPublishSerial(signalName as string));
        [action] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    setValue: expect.any(Function),
                }),
            ]),
        );
    });

    it("should call CrComLib.publishEvent() correctly", () => {
        act(() => {
            action.setValue("100");
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            "100",
        );

        expect(publishEvent).toHaveBeenCalledTimes(1);
    });
});
