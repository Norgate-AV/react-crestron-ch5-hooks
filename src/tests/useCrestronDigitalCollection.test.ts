import { renderHook, RenderHookResult, act } from "@testing-library/react/pure";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { useCrestronDigitalCollection } from "../hooks";
import { IDigitalEventAction, Digital } from "../types";
import { setupTest, signalNames } from "./helpers";

describe("useCrestronDigitalCollection", () => {
    const {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    } = setupTest<Digital>(CrestronCH5.SignalType.Digital, signalNames);

    let hook: RenderHookResult<
        [Digital[], IDigitalEventAction[]],
        unknown
    > | null = null;

    let state: Digital[];
    let actions: IDigitalEventAction[];

    beforeAll(() => {
        hook = renderHook(() =>
            useCrestronDigitalCollection(signalName as string[], callback),
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
            // Array.from<Digital>({ length: signalName.length }).fill(false),
            state,
            Array.from<IDigitalEventAction>({ length: signalName.length }).fill(
                {
                    setValue: expect.any(Function),
                    push: expect.any(Function),
                    release: expect.any(Function),
                    click: expect.any(Function),
                },
            ),
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
