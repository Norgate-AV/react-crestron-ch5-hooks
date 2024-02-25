import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import {
    SerialStateCallback,
    IStateSubscription,
    ISerialState,
} from "../@types/index.js";

/**
 * `useCrestronSubscribeSerialCollection` is a hook that returns an array of objects each with a value property.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to subscribe to.
 * @param {SerialStateCallback} [callback] - An optional callback function that will be called whenever the
 * state changes.
 * @returns An array of ISerialState objects.
 */
export function useCrestronSubscribeSerialCollection(
    signalNames: string[],
    callback?: SerialStateCallback,
): ISerialState[] {
    const [state, setState] = useState<ISerialState[]>(
        Array.from<ISerialState>({ length: signalNames.length }).fill({
            value: "",
        }),
    );

    const callbackRef = useRef<SerialStateCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.String;
        const subscriptions: IStateSubscription[] = [];

        signalNames.forEach((signalName, index) => {
            const id = subscribeState(
                signalType,
                signalName,
                (value: string) => {
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

export default useCrestronSubscribeSerialCollection;
export const useCrestronSubscribeStringCollection =
    useCrestronSubscribeSerialCollection;
