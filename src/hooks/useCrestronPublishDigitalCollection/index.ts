// import { publishEvent } from "@crestron/ch5-crcomlib";
// import CrestronCH5 from "@norgate-av/crestron-ch5-helper";

// interface DigitalActionCollection {
//     push: () => void;
//     release: () => void;
//     click: () => void;
//     hold: (duration: number, callback: () => void) => void;
// }

// export function useCrestronPublishDigitalCollection(
//     signalName: string,
// ): [(value: boolean) => void, DigitalActionCollection] {
//     const signalType = CrestronCH5.SignalType.Boolean;

//     const publish = (value: boolean) => {
//         publishEvent(signalType, signalName, value);
//     };

//     const push = () => {
//         publish(true);
//     };

//     const release = () => {
//         publish(false);
//     };

//     const click = () => {
//         publish(true);
//         publish(false);
//     };

//     const hold = (duration: number, callback: () => void) => {
//         publish(true);

//         setTimeout(() => {
//             publish(false);
//             callback();
//         }, duration);
//     };

//     const actions = {
//         push,
//         release,
//         click,
//         hold,
//     };

//     return [publish, actions];
// }

// export default useCrestronPublishDigitalCollection;
// export const useCrestronPublishBooleanCollection =
//     useCrestronPublishDigitalCollection;
export {};
