import {
    AnalogStateCallback,
    IAnalogEventAction,
    IAnalogSignal,
    IAnalogState,
} from "../@types/index.js";
import { getSignalCollection } from "../utils/index.js";
import { useCrestronPublishAnalogCollection } from "./useCrestronPublishAnalogCollection.js";
import { useCrestronSubscribeAnalogCollection } from "./useCrestronSubscribeAnalogCollection.js";

/**
 * `useCrestronAnalogCollection` is a hook that returns an array of objects each with state and action properties.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to use.
 * @param {AnalogStateCallback} [callback] - A optional callback function that will be called whenever the state of
 * the signal changes.
 * @returns An array of IAnalogSignal objects.
 */
export function useCrestronAnalogCollection(
    signalNames: string[],
    callback?: AnalogStateCallback,
): IAnalogSignal[] {
    const state = useCrestronSubscribeAnalogCollection(signalNames, callback);
    const action = useCrestronPublishAnalogCollection(signalNames);

    return getSignalCollection<IAnalogState, IAnalogEventAction>(
        signalNames.length,
        state,
        action,
    );
}

export default useCrestronAnalogCollection;
export const useCrestronNumberCollection = useCrestronAnalogCollection;
