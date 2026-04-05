import { useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
import { IAnalogEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishAnalogCollection` is a hook that returns an array of objects each with a setValue function.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to publish to.
 * @returns An array of IAnalogEventAction objects.
 */
export function useCrestronPublishAnalogCollection(
    signalNames: string[],
): IAnalogEventAction[] {
    return useMemo(
        () =>
            signalNames.map((signalName) => ({
                setValue: (value: number) =>
                    publishEvent("number", signalName, value),
            })),
        [signalNames],
    );
}

export default useCrestronPublishAnalogCollection;
export const useCrestronPublishNumberCollection =
    useCrestronPublishAnalogCollection;
