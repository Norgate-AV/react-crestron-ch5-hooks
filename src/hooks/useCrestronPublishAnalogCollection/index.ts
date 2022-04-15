import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { AnalogAction } from "../../types";

export function useCrestronPublishAnalogCollection(
    signalNames: string[],
): AnalogAction[] {
    const signalType = CrestronCH5.SignalType.Number;
    const actions: AnalogAction[] = [];

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
