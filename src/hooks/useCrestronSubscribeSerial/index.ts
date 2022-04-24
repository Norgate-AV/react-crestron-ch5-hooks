import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { ISerialState, SerialStateCallback } from "../../types";

/**
 * `useCrestronSubscribeSerial` is a hook that returns an object with a value property.
 * @param {string} signalName - The name of the signal you want to subscribe to.
 * @param {SerialStateCallback} [callback] - An optional callback function that will be called whenever the state
 * changes.
 * @returns An array with a single ISerialState object.
 */
export function useCrestronSubscribeSerial(
    signalName: string,
    callback?: SerialStateCallback,
): [ISerialState] {
    const [state, setState] = useState<string>("");
    const callbackRef = useRef<SerialStateCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.String;
        const id = subscribeState(signalType, signalName, (value: string) => {
            setState(value);

            if (callbackRef.current) {
                callbackRef.current(value, signalName);
            }
        });

        return () => {
            unsubscribeState(signalType, signalName, id);
        };
    }, [signalName]);

    return [{ value: state }];
}

export default useCrestronSubscribeSerial;
export const useCrestronSubscribeString = useCrestronSubscribeSerial;
