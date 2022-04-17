import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IAnalogAction } from "../../types";

export function useCrestronPublishAnalogCollection(
    signalNames: string[],
): IAnalogAction[] {
    const signalType = CrestronCH5.SignalType.Number;
    const actions: IAnalogAction[] = [];

    signalNames.forEach((signalName) => {
        actions.push({
            setValue: (value: number) =>
                publishEvent(signalType, signalName, value),
        });
    });

    return actions;
}

export default useCrestronPublishAnalogCollection;
export const useCrestronPublishNumberCollection =
    useCrestronPublishAnalogCollection;
