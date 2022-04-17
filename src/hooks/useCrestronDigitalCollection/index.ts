import { IDigitalAction, DigitalStateCallback } from "../../types";
import { useCrestronPublishDigitalCollection } from "../useCrestronPublishDigitalCollection";
import { useCrestronSubscribeDigitalCollection } from "../useCrestronSubscribeDigitalCollection";

export function useCrestronDigitalCollection(
    signalNames: string[],
    callback?: DigitalStateCallback,
): [boolean[], IDigitalAction[]] {
    const state = useCrestronSubscribeDigitalCollection(signalNames, callback);
    const action = useCrestronPublishDigitalCollection(signalNames);

    return [state, action];
}

export default useCrestronDigitalCollection;
export const useCrestronBooleanCollection = useCrestronDigitalCollection;
