import { IBaseSignal, ISerialEventAction, ISerialState } from "./index.js";

export interface ISerialSignal extends IBaseSignal<
    ISerialState,
    ISerialEventAction
> {}
