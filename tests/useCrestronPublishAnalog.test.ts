import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishAnalog } from "../src/hooks/index.js";
import { IAnalogEventAction } from "../src/@types/index.js";
import { setupPublishTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeAnalog", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Analog,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[IAnalogEventAction], unknown> | null = null;
    let action: IAnalogEventAction;

    beforeAll(() => {
        hook = renderHook(() => useCrestronPublishAnalog(signalName as string));
        [action] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    setValue: expect.any(Function) as (value: number) => void,
                }),
            ]),
        );
    });

    it("should call CrComLib.publishEvent() correctly", () => {
        act(() => {
            action.setValue(100);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, 100);
        expect(publishEvent).toHaveBeenCalledTimes(1);
    });
});
