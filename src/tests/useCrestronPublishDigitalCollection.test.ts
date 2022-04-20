import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronPublishDigitalCollection } from "../hooks";
import { IDigitalAction } from "../types";
import { setupPublishTest, signalNames } from "./helpers";

describe("useCrestronPublishDigitalCollection", () => {
    const { signalType, signalName, publishEvent } = setupPublishTest(
        CrestronCH5.SignalType.Digital,
        signalNames,
    );

    let hook: RenderHookResult<IDigitalAction[], unknown> | null = null;
    let actions: IDigitalAction[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronPublishDigitalCollection(signalName as string[]),
        );

        actions = hook.result.current;
    });

    it("should initialize correctly", () => {
        expect(hook?.result.current).toEqual(
            Array.from<IDigitalAction>({ length: signalName.length }).fill({
                setValue: expect.any(Function),
                push: expect.any(Function),
                release: expect.any(Function),
                click: expect.any(Function),
            }),
        );
    });

    // it.each(
    //     signalNames.map((signalName, index) => {
    //         return [signalName, index];
    //     }),
    // )(
    //     "%s: should call CrComLib.publishEvent() correctly",
    //     (signalName, index) => {
    //         const action = actions[index as number];

    //         act(() => {
    //             action.setValue("100");
    //         });

    //         expect(publishEvent).toHaveBeenCalledWith(
    //             signalType,
    //             signalName,
    //             "100",
    //         );

    //         expect(publishEvent).toHaveBeenCalledTimes(1);
    //         publishEvent.mockClear();
    //     },
    // );

    it("should call CrComLib.publishEvent() correctly for each signalName", () => {
        const signalNames = signalName as string[];

        signalNames.forEach((signalName, index) => {
            const action = actions[index];

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
