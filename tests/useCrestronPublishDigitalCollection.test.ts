import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishDigitalCollection } from "../src/hooks/index.js";
import { IDigitalEventAction } from "../src/@types/index.js";
import { setupPublishTest, signalNames } from "./helpers/index.js";

describe("useCrestronPublishDigitalCollection", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Digital,
        signalNames,
    );

    let hook: RenderHookResult<IDigitalEventAction[], unknown> | null = null;
    let actions: IDigitalEventAction[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronPublishDigitalCollection(signalName as string[]),
        );

        actions = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IDigitalEventAction>({ length: signalName.length }).fill(
                {
                    setValue: expect.any(Function) as (value: boolean) => void,
                    push: expect.any(Function) as () => void,
                    release: expect.any(Function) as () => void,
                    click: expect.any(Function) as () => void,
                },
            ),
        );
    });

    it("should call CrComLib.publishEvent() correctly for each signalName", () => {
        const signalNames = signalName as string[];

        signalNames.forEach((signalName, index) => {
            const action = actions[index] as IDigitalEventAction;

            act(() => {
                action.setValue(true);
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                true,
            );

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

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                true,
            );
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

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                true,
            );
            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                false,
            );

            expect(publishEvent).toHaveBeenCalledTimes(2);
            publishEvent.mockClear();
        });
    });
});
