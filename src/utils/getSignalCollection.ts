import { IBaseSignal } from "../types";

export function getSignalCollection<TState, TEventAction>(
    length: number,
    state: TState[],
    action: TEventAction[],
): IBaseSignal<TState, TEventAction>[] {
    const signals: IBaseSignal<TState, TEventAction>[] = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < length; index++) {
        signals.push({ state: state[index], action: action[index] });
    }

    return signals;
}

export default getSignalCollection;
