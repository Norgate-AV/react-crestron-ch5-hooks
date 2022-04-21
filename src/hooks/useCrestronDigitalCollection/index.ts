import {
    DigitalStateCallback,
    IDigitalEventAction,
    IDigitalSignal,
    IDigitalState,
} from "../../types";
import { getSignalCollection } from "../../utils";
import { useCrestronPublishDigitalCollection } from "../useCrestronPublishDigitalCollection";
import { useCrestronSubscribeDigitalCollection } from "../useCrestronSubscribeDigitalCollection";

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
