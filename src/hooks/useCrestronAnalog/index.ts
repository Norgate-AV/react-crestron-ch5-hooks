import { AnalogAction, AnalogStateCallback } from "../../types";
import { useCrestronPublishAnalog } from "../useCrestronPublishAnalog";
import { useCrestronSubscribeAnalog } from "../useCrestronSubscribeAnalog";

export function useCrestronAnalog(
    signalName: string,
    callback?: AnalogStateCallback,
): [number, AnalogAction] {
    const [state] = useCrestronSubscribeAnalog(signalName, callback);
    const [action] = useCrestronPublishAnalog(signalName);

    return [state, action];
}

export default useCrestronAnalog;
export const useCrestronNumber = useCrestronAnalog;
