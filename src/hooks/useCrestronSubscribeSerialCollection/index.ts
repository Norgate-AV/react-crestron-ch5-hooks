import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import {
    SerialStateCallback,
    IStateSubscription,
    ISerialState,
} from "../../types";

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
                    const newState = [...state];
                    newState[index].value = value;

                    setState(newState);

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
    }, [signalNames]);

    return state;
}

export default useCrestronSubscribeSerialCollection;
export const useCrestronSubscribeStringCollection =
    useCrestronSubscribeSerialCollection;
