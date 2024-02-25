import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IDigitalEventAction } from "../@types/index.js";

/**
 * `useCrestronPublishDigital` is a hook that returns an object with setValue, push, release and click functions.
 * @param {string} signalName - The name of the signal you want to publish to.
 * @returns An array with a single IDigitalEventAction object.
 */
export function useCrestronPublishDigital(
    signalName: string,
): [IDigitalEventAction] {
    const signalType = CrestronCH5.SignalType.Boolean;

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

    return [
        {
            setValue,
            push,
            release,
            click,
            // hold,
        },
    ];
}

export default useCrestronPublishDigital;
export const useCrestronPublishBoolean = useCrestronPublishDigital;
