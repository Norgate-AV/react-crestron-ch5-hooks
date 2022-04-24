import * as CrComLib from "@crestron/ch5-crcomlib";
import { StateCallback } from "../../types";

export function setupSubscribeTest<T>(
    signalType: string,
    signalName: string | string[],
) {
    const callback: StateCallback<T> = (value, signalName) => {
        console.log(`Signal: ${signalName}, New Value: [${value}]`);
    };

    const subscribeState = jest.spyOn(CrComLib, "subscribeState");
    const unsubscribeState = jest.spyOn(CrComLib, "unsubscribeState");

    return {
        signalType,
        signalName,
        callback,
        subscribeState,
        unsubscribeState,
    };
}

export default setupSubscribeTest;
