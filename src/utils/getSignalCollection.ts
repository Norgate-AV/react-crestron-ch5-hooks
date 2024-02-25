import { IBaseSignal } from "../@types/index.js";

export function getSignalCollection<TState, TEventAction>(
    length: number,
    state: TState[],
    action: TEventAction[],
): IBaseSignal<TState, TEventAction>[] {
    const signals: IBaseSignal<TState, TEventAction>[] = [];

    for (let index = 0; index < length; index++) {
        signals.push({
            state: state[index] as TState,
            action: action[index] as TEventAction,
        });
    }

    return signals;
}

export default getSignalCollection;
