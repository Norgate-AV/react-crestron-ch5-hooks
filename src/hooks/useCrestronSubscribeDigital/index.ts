import { useState, useRef, useEffect } from "react";
import { subscribeState, unsubscribeState } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { DigitalStateCallback, IDigitalState } from "../../types";

export function useCrestronSubscribeDigital(
    signalName: string,
    callback?: DigitalStateCallback,
): [IDigitalState] {
    const [state, setState] = useState<boolean>(false);
    const callbackRef = useRef<DigitalStateCallback | undefined>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const signalType = CrestronCH5.SignalType.Boolean;
        const id = subscribeState(signalType, signalName, (value: boolean) => {
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

export default useCrestronSubscribeDigital;
export const useCrestronSubscribeBoolean = useCrestronSubscribeDigital;
