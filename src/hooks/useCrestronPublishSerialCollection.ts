import { useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
import { ISerialEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishSerialCollection` is a hook that returns an array of objects each with a setValue function.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to publish to.
 * @returns An array of ISerialEventAction objects.
 */
export function useCrestronPublishSerialCollection(
    signalNames: string[],
): ISerialEventAction[] {
    return useMemo(
        () =>
            signalNames.map((signalName) => ({
                setValue: (value: string) =>
                    publishEvent("string", signalName, value),
            })),
        [signalNames],
    );
}

export default useCrestronPublishSerialCollection;
export const useCrestronPublishStringCollection =
    useCrestronPublishSerialCollection;
