import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { SerialAction } from "../../types";

export function useCrestronPublishSerial(signalName: string): [SerialAction] {
    return [
        {
            setValue: (value: string) =>
                publishEvent(CrestronCH5.SignalType.String, signalName, value),
        },
    ];
}

export default useCrestronPublishSerial;
export const useCrestronPublishString = useCrestronPublishSerial;
