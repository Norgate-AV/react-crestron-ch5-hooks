import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { ISerialAction } from "../../types";

export function useCrestronPublishSerialCollection(
    signalNames: string[],
): ISerialAction[] {
    const signalType = CrestronCH5.SignalType.String;
    const actions: ISerialAction[] = [];

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
