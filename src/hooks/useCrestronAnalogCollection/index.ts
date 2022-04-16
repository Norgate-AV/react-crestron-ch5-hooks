import { AnalogAction, AnalogStateCollectionCallback } from "../../types";
import { useCrestronPublishAnalogCollection } from "../useCrestronPublishAnalogCollection";
import { useCrestronSubscribeAnalogCollection } from "../useCrestronSubscribeAnalogCollection";

export function useCrestronAnalogCollection(
    signalNames: string[],
    callback?: AnalogStateCollectionCallback,
): [number[], AnalogAction[]] {
    const state = useCrestronSubscribeAnalogCollection(signalNames, callback);
    const action = useCrestronPublishAnalogCollection(signalNames);

    return [state, action];
}

export default useCrestronAnalogCollection;
export const useCrestronNumberCollection = useCrestronAnalogCollection;
