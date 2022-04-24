import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IAnalogEventAction } from "../../types";

/**
 * `useCrestronPublishAnalog` is a hook that returns an object with a setValue function.
 * @param {string} signalName - The name of the signal you want to publish to.
 * @returns An array with a single IAnalogEventAction object.
 */
export function useCrestronPublishAnalog(
    signalName: string,
): [IAnalogEventAction] {
    return [
        {
            setValue: (value: number) =>
                publishEvent(CrestronCH5.SignalType.Number, signalName, value),
        },
    ];
}

export default useCrestronPublishAnalog;
export const useCrestronPublishNumber = useCrestronPublishAnalog;
