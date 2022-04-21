import { IAnalogState } from "../IAnalogState";
import { IAnalogEventAction } from "../IAnalogEventAction";
import { IBaseSignal } from "../IBaseSignal";

export declare interface IAnalogSignal
    extends IBaseSignal<IAnalogState, IAnalogEventAction> {}
