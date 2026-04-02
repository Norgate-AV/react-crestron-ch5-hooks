import { useCallback, useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IDigitalEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishDigital` is a hook that returns an object with setValue, push, release and click functions.
 * @param {string} signalName - The name of the signal you want to publish to.
 * @returns An array with a single IDigitalEventAction object.
 */
export function useCrestronPublishDigital(
    signalName: string,
): [IDigitalEventAction] {
    const setValue = useCallback(
        (value: boolean) =>
            publishEvent(CrestronCH5.SignalType.Boolean, signalName, value),
        [signalName],
    );

    const push = useCallback(() => setValue(true), [setValue]);
    const release = useCallback(() => setValue(false), [setValue]);
    const click = useCallback(() => {
        push();
        release();
    }, [push, release]);

    // const hold = (duration: number, callback: () => void) => {
    //     push();

    //     setTimeout(() => {
    //         release();
    //         callback();
    //     }, duration);
    // };

    return useMemo(
        () => [{ setValue, push, release, click }],
        [setValue, push, release, click],
    );
}

export default useCrestronPublishDigital;
export const useCrestronPublishBoolean = useCrestronPublishDigital;
