import { useCallback, useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
import { IAnalogEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishAnalog` is a hook that returns an object with a setValue function.
 * @param {string} signalName - The name of the signal you want to publish to.
 * @returns An array with a single IAnalogEventAction object.
 */
export function useCrestronPublishAnalog(
    signalName: string,
): [IAnalogEventAction] {
    const setValue = useCallback(
        (value: number) => publishEvent("number", signalName, value),
        [signalName],
    );

    return useMemo(() => [{ setValue }], [setValue]);
}

export default useCrestronPublishAnalog;
export const useCrestronPublishNumber = useCrestronPublishAnalog;
