import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { AnalogStateCollectionCallback, IStateSubscription } from "../../types";

export function useCrestronSubscribeAnalogCollection(
    signalNames: string[],
    callback?: AnalogStateCollectionCallback,
): number[] {
    const [state, setState] = useState<number[]>(
        Array.from<number>({ length: signalNames.length }).fill(0),
    );

    const callbackRef = useRef<AnalogStateCollectionCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.Number;
        const subscriptions: IStateSubscription[] = [];

        signalNames.forEach((signalName, index) => {
            const id = subscribeState(
                signalType,
                signalName,
                (value: number) => {
                    const newState: number[] = [...state];
                    newState[index] = value;

                    setState(newState);

                    if (callbackRef.current) {
                        callbackRef.current(signalName, value);
                    }
                },
            );

            subscriptions.push({ id, signalName });
        });

        const unsubscribeAll = () => {
            subscriptions.forEach(({ id, signalName }) => {
                unsubscribeState(signalType, signalName, id);
            });
        };

        return () => {
            unsubscribeAll();
        };
    }, [signalNames]);

    return state;
}

export default useCrestronSubscribeAnalogCollection;
export const useCrestronSubscribeNumberCollection =
    useCrestronSubscribeAnalogCollection;
