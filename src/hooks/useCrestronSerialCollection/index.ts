import { ISerialEventAction, SerialStateCallback } from "../../types";
import { useCrestronPublishSerialCollection } from "../useCrestronPublishSerialCollection";
import { useCrestronSubscribeSerialCollection } from "../useCrestronSubscribeSerialCollection";

export function useCrestronSerialCollection(
    signalNames: string[],
    callback?: SerialStateCallback,
): [string[], ISerialEventAction[]] {
    const state = useCrestronSubscribeSerialCollection(signalNames, callback);
    const action = useCrestronPublishSerialCollection(signalNames);

    return [state, action];
}

export default useCrestronSerialCollection;
export const useCrestronStringCollection = useCrestronSerialCollection;
