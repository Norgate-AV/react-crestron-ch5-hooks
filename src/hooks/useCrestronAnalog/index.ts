import { useState, useRef, useEffect } from "react";
import {
    subscribeState,
    unsubscribeState,
    publishEvent,
} from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { AnalogAction, AnalogStateCallback } from "../../types";

export function useCrestronAnalog(
    signalName: string,
    callback?: AnalogStateCallback,
): [number, AnalogAction] {
    const signalType = CrestronCH5.SignalType.Number;
    const [state, setState] = useState<number>(0);
    const callbackRef = useRef<AnalogStateCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const id = subscribeState(signalType, signalName, (value: number) => {
            setState(value);

            if (callbackRef.current) {
                callbackRef.current(value);
            }
        });

        return () => {
            unsubscribeState(signalType, signalName, id);
        };
    }, [signalName]);

    return [
        state,
        {
            setValue: (value: number) =>
                publishEvent(signalType, signalName, value),
        },
    ];
}

export default useCrestronAnalog;
export const useCrestronNumber = useCrestronAnalog;
