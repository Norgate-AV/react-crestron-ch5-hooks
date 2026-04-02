import { IBaseSignal, IDigitalEventAction, IDigitalState } from "./index.js";

export interface IDigitalSignal extends IBaseSignal<
    IDigitalState,
    IDigitalEventAction
> {}
