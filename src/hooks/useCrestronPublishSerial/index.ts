import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { ISerialEventAction } from "../../types";

/**
 * `useCrestronPublishSerial` is a hook that returns an object with a setValue function.
 * @param {string} signalName - The name of the signal you want to publish to.
 * @returns An array with a single ISerialEventAction object.
 */
export function useCrestronPublishSerial(
    signalName: string,
): [ISerialEventAction] {
    return [
        {
            setValue: (value: string) =>
                publishEvent(CrestronCH5.SignalType.String, signalName, value),
        },
    ];
}

export default useCrestronPublishSerial;
export const useCrestronPublishString = useCrestronPublishSerial;
