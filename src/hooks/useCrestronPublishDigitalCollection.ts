import { useMemo } from "react";
import { publishEvent } from "@crestron/ch5-crcomlib";
import { IDigitalEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishDigitalCollection` is a hook that returns an array of objects each with setValue, push, release and click functions.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to publish to.
 * @returns An array of IDigitalEventAction objects.
 */
export function useCrestronPublishDigitalCollection(
    signalNames: string[],
): IDigitalEventAction[] {
    return useMemo(
        () =>
            signalNames.map((signalName) => {
                const setValue = (value: boolean) => {
                    publishEvent("boolean", signalName, value);
                };

                const push = () => setValue(true);
                const release = () => setValue(false);
                const hold = (duration: number) => {
                    push();
                    setTimeout(release, duration);
                };
                const click = () => hold(0);

                return {
                    setValue,
                    push,
                    release,
                    hold,
                    click,
                };
            }),
        [signalNames],
    );
}

export default useCrestronPublishDigitalCollection;
export const useCrestronPublishBooleanCollection =
    useCrestronPublishDigitalCollection;
