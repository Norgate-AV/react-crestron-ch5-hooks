import { useCallback, useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
import { ISerialEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishSerial` is a hook that returns an object with a setValue function.
 * @param {string} signalName - The name of the signal you want to publish to.
 * @returns An array with a single ISerialEventAction object.
 */
export function useCrestronPublishSerial(
    signalName: string,
): [ISerialEventAction] {
    const setValue = useCallback(
        (value: string) => publishEvent("string", signalName, value),
        [signalName],
    );

    return useMemo(() => [{ setValue }], [setValue]);
}

export default useCrestronPublishSerial;
export const useCrestronPublishString = useCrestronPublishSerial;
