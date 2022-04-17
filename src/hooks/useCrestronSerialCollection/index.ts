import { ISerialAction, SerialStateCollectionCallback } from "../../types";
import { useCrestronPublishSerialCollection } from "../useCrestronPublishSerialCollection";
import { useCrestronSubscribeSerialCollection } from "../useCrestronSubscribeSerialCollection";

export function useCrestronSerialCollection(
    signalNames: string[],
    callback?: SerialStateCollectionCallback,
): [string[], ISerialAction[]] {
    const state = useCrestronSubscribeSerialCollection(signalNames, callback);
    const action = useCrestronPublishSerialCollection(signalNames);

    return [state, action];
}

export default useCrestronSerialCollection;
export const useCrestronStringCollection = useCrestronSerialCollection;
