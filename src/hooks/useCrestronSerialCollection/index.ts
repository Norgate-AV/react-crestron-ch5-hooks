import {
    ISerialEventAction,
    ISerialSignal,
    ISerialState,
    SerialStateCallback,
} from "../../types";
import { getSignalCollection } from "../../utils";
import { useCrestronPublishSerialCollection } from "../useCrestronPublishSerialCollection";
import { useCrestronSubscribeSerialCollection } from "../useCrestronSubscribeSerialCollection";

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
