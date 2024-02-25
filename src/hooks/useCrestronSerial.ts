import { ISerialSignal, SerialStateCallback } from "../@types/index.js";
import { useCrestronPublishSerial } from "./useCrestronPublishSerial.js";
import { useCrestronSubscribeSerial } from "./useCrestronSubscribeSerial.js";

/**
 * `useCrestronSerial` is a hook that returns an object with a state and action property.
 * @param {string} signalName - The name of the signal you want to use.
 * @param {SerialStateCallback} [callback] - An optional callback function that will be called whenever the state of the signal
 * changes.
 * @returns An array with a single ISerialSignal object.
 */
export function useCrestronSerial(
    signalName: string,
    callback?: SerialStateCallback,
): [ISerialSignal] {
    const [state] = useCrestronSubscribeSerial(signalName, callback);
    const [action] = useCrestronPublishSerial(signalName);

    return [{ state, action }];
}

export default useCrestronSerial;
export const useCrestronString = useCrestronSerial;
