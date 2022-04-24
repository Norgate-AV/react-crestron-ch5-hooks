import {
    DigitalStateCallback,
    IDigitalEventAction,
    IDigitalSignal,
    IDigitalState,
} from "../../types";
import { getSignalCollection } from "../../utils";
import { useCrestronPublishDigitalCollection } from "../useCrestronPublishDigitalCollection";
import { useCrestronSubscribeDigitalCollection } from "../useCrestronSubscribeDigitalCollection";

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
