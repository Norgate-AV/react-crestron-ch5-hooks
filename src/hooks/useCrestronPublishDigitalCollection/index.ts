import { publishEvent } from "@crestron/ch5-crcomlib";
import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

export function useCrestronPublishDigitalCollection(
    signalNames: string[],
): DigitalAction[] {
    const signalType = CrestronCH5.SignalType.Boolean;
    const actions: DigitalAction[] = [];

    signalNames.forEach((signalName) => {
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
            push();
            release();
        };

        const hold = (duration: number, callback: () => void) => {
            push();

            setTimeout(() => {
                release();
                callback();
            }, duration);
        };

        actions.push({
            push,
            release,
            click,
            hold,
        });
    });

    return actions;
}

export default useCrestronPublishDigitalCollection;
export const useCrestronPublishBooleanCollection =
    useCrestronPublishDigitalCollection;
