import { useCallback, useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
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
        (value: boolean) => publishEvent("boolean", signalName, value),
        [signalName],
    );

    const push = useCallback(() => setValue(true), [setValue]);
    const release = useCallback(() => setValue(false), [setValue]);
    const hold = useCallback(
        (duration: number) => {
            push();
            setTimeout(release, duration);
        },
        [push, release],
    );
    const click = useCallback(() => hold(0), [hold]);

    return useMemo(
        () => [{ setValue, push, release, hold, click }],
        [setValue, push, release, hold, click],
    );
}

export default useCrestronPublishDigital;
export const useCrestronPublishBoolean = useCrestronPublishDigital;
