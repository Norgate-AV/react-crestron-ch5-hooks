import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronPublishDigital(signalName: string): [DigitalAction] {
    const signalType = CrestronCH5.SignalType.Boolean;

    const publish = (value: boolean) => {
        publishEvent(signalType, signalName, value);
    };

    const push = () => {
        publish(true);
    };

    const release = () => {
        publish(false);
    };

    const click = () => {
        publish(true);
        publish(false);
    };

    const hold = (duration: number, callback: () => void) => {
        publish(true);

        setTimeout(() => {
            publish(false);
            callback();
        }, duration);
    };

    return [
        {
            push,
            release,
            click,
            hold,
        },
    ];
}

export default useCrestronPublishDigital;
export const useCrestronPublishBoolean = useCrestronPublishDigital;
