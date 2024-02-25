import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishDigital } from "../src/hooks/index.js";
import { IDigitalEventAction } from "../src/@types/index.js";
import { setupPublishTest, signalNames } from "./helpers/index.js";

describe("useCrestronSubscribeDigital", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Digital,
        signalNames[0] as string,
    );

    let hook: RenderHookResult<[IDigitalEventAction], unknown> | null = null;
    let action: IDigitalEventAction;

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronPublishDigital(signalName as string),
        );

        [action] = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    setValue: expect.any(Function) as (value: boolean) => void,
                    push: expect.any(Function) as () => void,
                    release: expect.any(Function) as () => void,
                    click: expect.any(Function) as () => void,
                }),
            ]),
        );
    });

    it("should call CrComLib.publishEvent() correctly", () => {
        act(() => {
            action.setValue(true);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            action.setValue(false);
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );

        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            action.push();
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            action.release();
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );

        expect(publishEvent).toHaveBeenCalledTimes(1);
        publishEvent.mockClear();

        act(() => {
            action.click();
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );

        expect(publishEvent).toHaveBeenCalledTimes(2);
        publishEvent.mockClear();
    });
});
