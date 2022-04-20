import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronAnalogCollection } from "../hooks";
import { IAnalogEventAction, Analog } from "../types";
import { setupTest, signalNames } from "./helpers";

describe("useCrestronAnalogCollection", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Analog>(CrestronCH5.SignalType.Analog, signalNames);

    let hook: RenderHookResult<
        [Analog[], IAnalogEventAction[]],
        unknown
    > | null = null;

    let state: Analog[];
    let actions: IAnalogEventAction[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronAnalogCollection(signalName as string[], callback),
        );

        [state, actions] = hook.result.current;
    });

    it("should initialize correctly", () => {
        // expect(hook?.result.current).toEqual(
        //     expect.arrayContaining([
        //         state,
        //         expect.objectContaining({
        //             setValue: expect.any(Function),
        //             push: expect.any(Function),
        //             release: expect.any(Function),
        //             click: expect.any(Function),
        //         }),
        //     ]),
        // );

        expect(hook?.result.current).toEqual([
            // Array.from<Analog>({ length: signalName.length }).fill(false),
            state,
            Array.from<IAnalogEventAction>({ length: signalName.length }).fill({
                setValue: expect.any(Function),
            }),
        ]);
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

    it("should call CrComLib.publishEvent() correctly for each signalName", () => {
        const signalNames = signalName as string[];

        signalNames.forEach((signalName, index) => {
            const action = actions[index];

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

    it("should call CrComLib.unsubscribeState() correctly on unmount", () => {
        act(() => {
            hook?.unmount();
        });

        expect(unsubscribeState).toHaveBeenCalledWith(
            signalType,
            expect.any(String),
            expect.any(String),
        );

        expect(unsubscribeState).toHaveBeenCalledTimes(signalName.length);
    });
});
