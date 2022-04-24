import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IDigitalEventAction } from "../../types";

/**
 * `useCrestronPublishDigitalCollection` is a hook that returns an array of objects each with setValue, push, release and click functions.
 * @param {string[]} signalNames - An array of strings that represent the names of the signals you want
 * to publish to.
 * @returns An array of IDigitalEventAction objects.
 */
export function useCrestronPublishDigitalCollection(
    signalNames: string[],
): IDigitalEventAction[] {
    const signalType = CrestronCH5.SignalType.Boolean;
    const actions: IDigitalEventAction[] = [];

    signalNames.forEach((signalName) => {
        const setValue = (value: boolean) => {
            publishEvent(signalType, signalName, value);
        };

        const push = () => {
            setValue(true);
        };

        const release = () => {
            setValue(false);
        };

        const click = () => {
            push();
            release();
        };

        // const hold = (duration: number, callback: () => void) => {
        //     push();

        //     setTimeout(() => {
        //         release();
        //         callback();
        //     }, duration);
        // };

        actions.push({
            setValue,
            push,
            release,
            click,
            // hold,
        });
    });

    return actions;
}

export default useCrestronPublishDigitalCollection;
export const useCrestronPublishBooleanCollection =
    useCrestronPublishDigitalCollection;
