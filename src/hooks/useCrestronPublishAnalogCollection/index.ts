import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IAnalogEventAction } from "../../types";

/**
 * `useCrestronPublishAnalogCollection` is a hook that returns an array of objects each with a setValue function.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to publish to.
 * @returns An array of IAnalogEventAction objects.
 */
export function useCrestronPublishAnalogCollection(
    signalNames: string[],
): IAnalogEventAction[] {
    const signalType = CrestronCH5.SignalType.Number;
    const actions: IAnalogEventAction[] = [];

    signalNames.forEach((signalName) => {
        actions.push({
            setValue: (value: number) =>
                publishEvent(signalType, signalName, value),
        });
    });

    return actions;
}

export default useCrestronPublishAnalogCollection;
export const useCrestronPublishNumberCollection =
    useCrestronPublishAnalogCollection;
