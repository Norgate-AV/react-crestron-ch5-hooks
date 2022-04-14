import { useState, useRef, useEffect } from "react";
import {
    subscribeState,
    unsubscribeState,
    publishEvent,
} from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronSerial(
    signalName: string,
    callback?: (value: string) => void,
): [string, (value: string) => void] {
    const signalType = CrestronCH5.SignalType.String;
    const [state, setState] = useState<string>("");
    const callbackRef = useRef<(value: string) => void | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const id = subscribeState(signalType, signalName, (value: string) => {
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
        (value: string) => publishEvent(signalType, signalName, value),
    ];
}

export default useCrestronSerial;
export const useCrestronString = useCrestronSerial;
