// eslint-disable-next-line import/no-cycle
import { setupSubscribeTest, setupPublishTest } from ".";

export function setupTest<T>(
    signalType: string,
    signalName: string | string[],
) {
    const { callback, subscribeState, unsubscribeState } =
        setupSubscribeTest<T>(signalType, signalName);

    const { publishEvent } = setupPublishTest(signalType, signalName);

    return {
        signalType,
        signalName,
        publishEvent,
        callback,
        subscribeState,
        unsubscribeState,
    };
}

export default setupTest;
