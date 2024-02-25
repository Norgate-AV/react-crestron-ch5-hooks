import {
    ISerialEventAction,
    ISerialSignal,
    ISerialState,
    SerialStateCallback,
} from "../@types/index.js";
import { getSignalCollection } from "../utils/index.js";
import { useCrestronPublishSerialCollection } from "./useCrestronPublishSerialCollection.js";
import { useCrestronSubscribeSerialCollection } from "./useCrestronSubscribeSerialCollection.js";

/**
 * `useCrestronSerialCollection` is a hook that returns an array of objects each with state and action properties.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to use.
 * @param {SerialStateCallback} [callback] - A optional callback function that will be called whenever the state of
 * the signal changes.
 * @returns An array of ISerialSignal objects.
 */
export function useCrestronSerialCollection(
    signalNames: string[],
    callback?: SerialStateCallback,
): ISerialSignal[] {
    const state = useCrestronSubscribeSerialCollection(signalNames, callback);
    const action = useCrestronPublishSerialCollection(signalNames);

    return getSignalCollection<ISerialState, ISerialEventAction>(
        signalNames.length,
        state,
        action,
    );
}

export default useCrestronSerialCollection;
export const useCrestronStringCollection = useCrestronSerialCollection;
