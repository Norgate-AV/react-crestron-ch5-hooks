import {
    DigitalStateCallback,
    IDigitalEventAction,
    IDigitalSignal,
    IDigitalState,
} from "../@types/index.js";
import { getSignalCollection } from "../utils/index.js";
import { useCrestronPublishDigitalCollection } from "./useCrestronPublishDigitalCollection.js";
import { useCrestronSubscribeDigitalCollection } from "./useCrestronSubscribeDigitalCollection.js";

/**
 * `useCrestronDigitalCollection` is a hook that returns an array of objects each with state and action properties.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to use.
 * @param {DigitalStateCallback} [callback] - A optional callback function that will be called whenever the state of
 * the signal changes.
 * @returns An array of IDigitalSignal objects.
 */
export function useCrestronDigitalCollection(
    signalNames: string[],
    callback?: DigitalStateCallback,
): IDigitalSignal[] {
    const state = useCrestronSubscribeDigitalCollection(signalNames, callback);
    const action = useCrestronPublishDigitalCollection(signalNames);

    return getSignalCollection<IDigitalState, IDigitalEventAction>(
        signalNames.length,
        state,
        action,
    );
}

export default useCrestronDigitalCollection;
export const useCrestronBooleanCollection = useCrestronDigitalCollection;
