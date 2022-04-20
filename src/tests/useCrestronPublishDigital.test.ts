import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishDigital } from "../hooks";
import { IDigitalAction } from "../types";
import { setupPublishTest, signalNames } from "./helpers";

describe("useCrestronSubscribeDigital", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Digital,
        signalNames[0],
    );

    let hook: RenderHookResult<[IDigitalAction], unknown> | null = null;
    let action: IDigitalAction;

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
                    setValue: expect.any(Function),
                    push: expect.any(Function),
                    release: expect.any(Function),
                    click: expect.any(Function),
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
