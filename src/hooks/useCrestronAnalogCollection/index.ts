import { AnalogAction, AnalogStateCollectionCallback } from "../../types";
import { useCrestronPublishAnalogCollection } from "../useCrestronPublishAnalogCollection";
import { useCrestronSubscribeAnalogCollection } from "../useCrestronSubscribeAnalogCollection";

export function useCrestronAnalogCollection(
    signalName: string,
    callback?: AnalogStateCollectionCallback,
): [number[], AnalogAction[]] {
    const state = useCrestronSubscribeAnalogCollection(signalName, callback);
    const action = useCrestronPublishAnalogCollection(signalName);

    return [state, action];
}

export default useCrestronAnalogCollection;
export const useCrestronNumberCollection = useCrestronAnalogCollection;
