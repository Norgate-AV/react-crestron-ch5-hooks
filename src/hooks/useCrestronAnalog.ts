import { AnalogStateCallback, IAnalogSignal } from "../@types/index.js";
import { useCrestronPublishAnalog } from "./useCrestronPublishAnalog.js";
import { useCrestronSubscribeAnalog } from "./useCrestronSubscribeAnalog.js";

/**
 * `useCrestronAnalog` is a hook that returns an object with a state and action property.
 * @param {string} signalName - The name of the signal you want to use.
 * @param {AnalogStateCallback} [callback] - An optional callback function that will be called whenever the state of the signal
 * changes.
 * @returns An array with a single IAnalogSignal object.
 */
export function useCrestronAnalog(
    signalName: string,
    callback?: AnalogStateCallback,
): [IAnalogSignal] {
    const [state] = useCrestronSubscribeAnalog(signalName, callback);
    const [action] = useCrestronPublishAnalog(signalName);

    return [{ state, action }];
}

export default useCrestronAnalog;
export const useCrestronNumber = useCrestronAnalog;
