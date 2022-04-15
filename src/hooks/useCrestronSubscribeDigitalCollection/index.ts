import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { DigitalStateCollectionCallback, StateSubscription } from "../../types";

export function useCrestronSubscribeDigitalCollection(
    signalNames: string[],
    callback?: DigitalStateCollectionCallback,
): boolean[] {
    const [state, setState] = useState<boolean[]>(
        Array.from({ length: signalNames.length }).fill(false),
    );

    const callbackRef = useRef<DigitalStateCollectionCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.Boolean;
        const subscriptions: StateSubscription[] = [];

        signalNames.forEach((signalName, index) => {
            const id = subscribeState(
                signalType,
                signalName,
                (value: boolean) => {
                    const newState: boolean[] = [...state];
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

export default useCrestronSubscribeDigitalCollection;
export const useCrestronSubscribeBooleanCollection =
    useCrestronSubscribeDigitalCollection;
