import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { IDigitalAction } from "../../types";

export function useCrestronPublishDigital(
    signalName: string,
): [IDigitalAction] {
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
