import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronSubscribeAnalog(
    signalName: string,
    callback?: (value: number) => void,
): [number] {
    const [state, setState] = useState<number>(0);
    const callbackRef = useRef<(value: number) => void | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.Number;
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

    return [state];
}

export default useCrestronSubscribeAnalog;
export const useCrestronSubscribeNumber = useCrestronSubscribeAnalog;
