import { IBaseEventAction, IBaseSignal, IBaseState } from "../types";

export function getSignalCollection<T>(
    length: number,
    state: IBaseState<T>[],
    action: IBaseEventAction<T>[],
): IBaseSignal<IBaseState<T>, IBaseEventAction<T>>[] {
    const signals: IBaseSignal<IBaseState<T>, IBaseEventAction<T>>[] = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < length; index++) {
        signals.push({ state: state[index], action: action[index] });
    }

    return signals;
}

export default getSignalCollection;
