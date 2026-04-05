import { useState, useRef, useEffect } from "react";
import {
    subscribeState,
    unsubscribeState,
    getState,
} from "@crestron/ch5-crcomlib";
import {
    DigitalStateCallback,
    IDigitalState,
    IStateSubscription,
} from "../@types/index.js";

/**
 * `useCrestronSubscribeDigitalCollection` is a hook that returns an array of objects each with a value property.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to subscribe to.
 * @param {DigitalStateCallback} [callback] - An optional callback function that will be called whenever the
 * state changes.
 * @returns An array of IDigitalState objects.
 */
export function useCrestronSubscribeDigitalCollection(
    signalNames: string[],
    callback?: DigitalStateCallback,
): IDigitalState[] {
    const [state, setState] = useState<IDigitalState[]>(() =>
        signalNames.map((signalName): IDigitalState => {
            const current = getState("boolean", signalName);
            return { value: current !== null ? (current as boolean) : false };
        }),
    );

    const callbackRef = useRef<DigitalStateCallback | undefined>(undefined);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = "boolean";
        const subscriptions: IStateSubscription[] = [];

        signalNames.forEach((signalName, index) => {
            const id = subscribeState(
                signalType,
                signalName,
                (value: boolean) => {
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

export default useCrestronSubscribeDigitalCollection;
export const useCrestronSubscribeBooleanCollection =
    useCrestronSubscribeDigitalCollection;
