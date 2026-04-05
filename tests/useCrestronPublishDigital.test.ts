import { describe, expect, it, beforeAll, vi } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import { useCrestronPublishDigital } from "../src/hooks/index.js";
import { IDigitalEventAction } from "../src/@types/index.js";
import { setupPublishTest, signalNames } from "./helpers/index.js";

describe("useCrestronPublishDigital", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        "boolean",
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
                    hold: expect.any(Function) as (duration: number) => void,
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

        vi.useFakeTimers();

        act(() => {
            action.click();
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(0);
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );
        expect(publishEvent).toHaveBeenCalledTimes(2);
        publishEvent.mockClear();

        vi.useRealTimers();
    });

    it("should call hold correctly", () => {
        vi.useFakeTimers();

        act(() => {
            action.hold(100);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(100);
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );
        expect(publishEvent).toHaveBeenCalledTimes(2);
        publishEvent.mockClear();

        vi.useRealTimers();
    });

    it("click should be equivalent to hold(0)", () => {
        vi.useFakeTimers();

        act(() => {
            action.hold(0);
        });

        expect(publishEvent).toHaveBeenCalledWith(signalType, signalName, true);
        expect(publishEvent).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(0);
        });

        expect(publishEvent).toHaveBeenCalledWith(
            signalType,
            signalName,
            false,
        );
        expect(publishEvent).toHaveBeenCalledTimes(2);
        publishEvent.mockClear();

        vi.useRealTimers();
    });
});
