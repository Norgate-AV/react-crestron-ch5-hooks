import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { SerialStateCollectionCallback, StateSubscription } from "../../types";

export function useCrestronSubscribeSerialCollection(
    signalNames: string[],
    callback?: SerialStateCollectionCallback,
): string[] {
    const [state, setState] = useState<string[]>(
        Array.from({ length: signalNames.length }).fill(""),
    );

    const callbackRef = useRef<SerialStateCollectionCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.String;
        const subscriptions: StateSubscription[] = [];

        signalNames.forEach((signalName, index) => {
            const id = subscribeState(
                signalType,
                signalName,
                (value: string) => {
                    const newState: string[] = [...state];
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

export default useCrestronSubscribeSerialCollection;
export const useCrestronSubscribeStringCollection =
    useCrestronSubscribeSerialCollection;
