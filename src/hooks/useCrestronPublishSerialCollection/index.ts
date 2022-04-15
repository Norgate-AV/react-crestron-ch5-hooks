import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { SerialAction } from "../../types";

export function useCrestronPublishSerialCollection(
    signalNames: string[],
): SerialAction[] {
    const signalType = CrestronCH5.SignalType.String;
    const actions: SerialAction[] = [];

    signalNames.forEach((signalName) => {
        actions.push({
            setValue: (value: string) =>
                publishEvent(signalType, signalName, value),
        });
    });

    return actions;
}

export default useCrestronPublishSerialCollection;
export const useCrestronPublishStringCollection =
    useCrestronPublishSerialCollection;
