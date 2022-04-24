import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { ISerialEventAction } from "../../types";

/**
 * `useCrestronPublishSerialCollection` is a hook that returns an array of objects each with a setValue function.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to publish to.
 * @returns An array of ISerialEventAction objects.
 */
export function useCrestronPublishSerialCollection(
    signalNames: string[],
): ISerialEventAction[] {
    const signalType = CrestronCH5.SignalType.String;
    const actions: ISerialEventAction[] = [];

    signalNames.forEach((signalName) => {
        actions.push({
            setValue: (value: string) =>
                publishEvent(signalType, signalName, value),
        });
    });

    return actions;
}

export default useCrestronPublishSerialCollection;
export const useCrestronPublishStringCollection =
    useCrestronPublishSerialCollection;
