import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { AnalogAction } from "../../types";

export function useCrestronPublishAnalog(signalName: string): [AnalogAction] {
    return [
        {
            setValue: (value: number) =>
                publishEvent(CrestronCH5.SignalType.Number, signalName, value),
        },
    ];
}

export default useCrestronPublishAnalog;
export const useCrestronPublishNumber = useCrestronPublishAnalog;
