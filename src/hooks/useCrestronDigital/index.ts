import { DigitalStateCallback, IDigitalSignal } from "../../types";
import { useCrestronPublishDigital } from "../useCrestronPublishDigital";
import { useCrestronSubscribeDigital } from "../useCrestronSubscribeDigital";

/**
 * `useCrestronDigital` is a hook that returns an object with a state and action property.
 * @param {string} signalName - The name of the signal you want to use.
 * @param {DigitalStateCallback} [callback] - An optional callback function that will be called whenever the state of the signal
 * changes.
 * @returns An array with a single IDigitalSignal object
 */
export function useCrestronDigital(
    signalName: string,
    callback?: DigitalStateCallback,
): [IDigitalSignal] {
    const [state] = useCrestronSubscribeDigital(signalName, callback);
    const [action] = useCrestronPublishDigital(signalName);

    return [{ state, action }];
}

export default useCrestronDigital;
export const useCrestronBoolean = useCrestronDigital;
