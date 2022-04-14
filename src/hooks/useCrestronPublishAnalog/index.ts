import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronPublishAnalog(
    signalName: string,
): [(value: number) => void] {
    return [
        (value: number) =>
            publishEvent(CrestronCH5.SignalType.Number, signalName, value),
    ];
}

export default useCrestronPublishAnalog;
export const useCrestronPublishNumber = useCrestronPublishAnalog;
