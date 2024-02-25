import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { AnalogStateCallback, IAnalogState } from "../@types/index.js";

/**
 * `useCrestronSubscribeAnalog` is a hook that returns an object with a value property.
 * @param {string} signalName - The name of the signal you want to subscribe to.
 * @param {AnalogStateCallback} [callback] - An optional callback function that will be called whenever the state
 * changes.
 * @returns An array with a single IAnalogState object.
 */
export function useCrestronSubscribeAnalog(
    signalName: string,
    callback?: AnalogStateCallback,
): [IAnalogState] {
    const [state, setState] = useState<number>(0);
    const callbackRef = useRef<AnalogStateCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.Number;
        const id = subscribeState(signalType, signalName, (value: number) => {
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

export default useCrestronSubscribeAnalog;
export const useCrestronSubscribeNumber = useCrestronSubscribeAnalog;
