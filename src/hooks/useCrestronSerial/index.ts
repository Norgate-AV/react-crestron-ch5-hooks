import { ISerialEventAction, SerialStateCallback } from "../../types";
import { useCrestronPublishSerial } from "../useCrestronPublishSerial";
import { useCrestronSubscribeSerial } from "../useCrestronSubscribeSerial";

export function useCrestronSerial(
    signalName: string,
    callback?: SerialStateCallback,
): [string, ISerialEventAction] {
    const [state] = useCrestronSubscribeSerial(signalName, callback);
    const [action] = useCrestronPublishSerial(signalName);

    return [state, action];
}

export default useCrestronSerial;
export const useCrestronString = useCrestronSerial;
