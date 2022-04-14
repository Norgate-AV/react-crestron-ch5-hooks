import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronPublishSerial(
    signalName: string,
): [(value: string) => void] {
    return [
        (value: string) =>
            publishEvent(CrestronCH5.SignalType.String, signalName, value),
    ];
}

export default useCrestronPublishSerial;
export const useCrestronPublishString = useCrestronPublishSerial;
