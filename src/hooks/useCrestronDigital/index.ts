import { DigitalStateCallback, IDigitalSignal } from "../../types";
import { useCrestronPublishDigital } from "../useCrestronPublishDigital";
import { useCrestronSubscribeDigital } from "../useCrestronSubscribeDigital";

export function useCrestronDigital(
    signalName: string,
    callback?: DigitalStateCallback,
): [IDigitalSignal] {
    const [state] = useCrestronSubscribeDigital(signalName, callback);
    const [action] = useCrestronPublishDigital(signalName);

    return [{ state, action }];
}

export default useCrestronDigital;
export const useCrestronBoolean = useCrestronDigital;
