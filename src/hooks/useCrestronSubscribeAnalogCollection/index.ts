import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import {
    AnalogStateCallback,
    IAnalogState,
    IStateSubscription,
} from "../../types";

/**
 * `useCrestronSubscribeAnalogCollection` is a hook that returns an array of objects each with a value property.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to subscribe to.
 * @param {AnalogStateCallback} [callback] - An optional callback function that will be called whenever the
 * state changes.
 * @returns An array of IAnalogState objects.
 */
export function useCrestronSubscribeAnalogCollection(
    signalNames: string[],
    callback?: AnalogStateCallback,
): IAnalogState[] {
    const [state, setState] = useState<IAnalogState[]>(
        Array.from<IAnalogState>({ length: signalNames.length }).fill({
            value: 0,
        }),
    );

    const callbackRef = useRef<AnalogStateCallback | undefined>();

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
                    setState((prevState) => {
                        const newState = [...prevState];

                        newState[index] = { ...newState[index], value };

                        return newState;
                    });

                    if (callbackRef.current) {
                        callbackRef.current(value, signalName);
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
    }, []);

    return state;
}

export default useCrestronSubscribeAnalogCollection;
export const useCrestronSubscribeNumberCollection =
    useCrestronSubscribeAnalogCollection;
