import { describe, expect, it, beforeAll } from "vitest";
import {
    renderHook,
    RenderHookResult,
    act,
} from "@testing-library/react/pure.js";
import { useCrestronPublishAnalogCollection } from "../src/hooks/index.js";
import { IAnalogEventAction } from "../src/@types/index.js";
import { setupPublishTest, signalNames } from "./helpers/index.js";

describe("useCrestronPublishAnalogCollection", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        "number",
        signalNames,
    );

    let hook: RenderHookResult<IAnalogEventAction[], unknown> | null = null;
    let actions: IAnalogEventAction[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronPublishAnalogCollection(signalName as string[]),
        );

        actions = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IAnalogEventAction>({ length: signalName.length }).fill({
                setValue: expect.any(Function) as (value: number) => void,
            }),
        );
    });

    it("should call CrComLib.publishEvent() correctly for each signalName", () => {
        const signalNames = signalName as string[];

        signalNames.forEach((signalName, index) => {
            const action = actions[index] as IAnalogEventAction;

            act(() => {
                action.setValue(100);
            });

            expect(publishEvent).toHaveBeenCalledWith(
                signalType,
                signalName,
                100,
            );

            expect(publishEvent).toHaveBeenCalledTimes(1);
            publishEvent.mockClear();
        });
    });
});
