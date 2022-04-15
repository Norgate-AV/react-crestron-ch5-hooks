import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { SerialStateCallback } from "../../types";

export function useCrestronSubscribeSerial(
    signalName: string,
    callback?: SerialStateCallback,
): [string] {
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
                callbackRef.current(value);
            }
        });

        return () => {
            unsubscribeState(signalType, signalName, id);
        };
    }, [signalName]);

    return [state];
}

export default useCrestronSubscribeSerial;
export const useCrestronSubscribeString = useCrestronSubscribeSerial;
