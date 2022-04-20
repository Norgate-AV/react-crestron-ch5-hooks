import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IAnalogEventAction } from "../../types";

export function useCrestronPublishAnalog(
    signalName: string,
): [IAnalogEventAction] {
    return [
        {
            setValue: (value: number) =>
                publishEvent(CrestronCH5.SignalType.Number, signalName, value),
        },
    ];
}

export default useCrestronPublishAnalog;
export const useCrestronPublishNumber = useCrestronPublishAnalog;
