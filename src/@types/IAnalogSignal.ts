import { IAnalogEventAction, IAnalogState, IBaseSignal } from "./index.js";

export interface IAnalogSignal extends IBaseSignal<
    IAnalogState,
    IAnalogEventAction
> {}
