import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishSerial } from "../src/hooks/index.js";
import { ISerialEventAction } from "../src/@types/index.js";
import { setupPublishTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeSerial", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Serial,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[ISerialEventAction], unknown> | null = null;
    let action: ISerialEventAction;

    beforeAll(() => {
        hook = renderHook(() => useCrestronPublishSerial(signalName as string));
        [action] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    setValue: expect.any(Function) as (value: string) => void,
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
