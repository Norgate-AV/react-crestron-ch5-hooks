import { useState, useRef, useEffect } from "react";
import {
    subscribeState,
    unsubscribeState,
    publishEvent,
} from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronDigital(
    signalName: string,
    callback?: (value: boolean) => void,
): [boolean, (value: boolean) => void] {
    const signalType = CrestronCH5.SignalType.Boolean;
    const [state, setState] = useState<boolean>(false);
    const callbackRef = useRef<(value: boolean) => void | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const id = subscribeState(signalType, signalName, (value: boolean) => {
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
        (value: boolean) => publishEvent(signalType, signalName, value),
    ];
}

export default useCrestronDigital;
export const useCrestronBoolean = useCrestronDigital;
