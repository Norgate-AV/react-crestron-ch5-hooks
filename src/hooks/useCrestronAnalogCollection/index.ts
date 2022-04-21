import {
    AnalogStateCallback,
    IAnalogEventAction,
    IAnalogSignal,
    IAnalogState,
} from "../../types";
import { getSignalCollection } from "../../utils";
import { useCrestronPublishAnalogCollection } from "../useCrestronPublishAnalogCollection";
import { useCrestronSubscribeAnalogCollection } from "../useCrestronSubscribeAnalogCollection";

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
