import { ISerialEventAction } from "../ISerialEventAction";
import { ISerialState } from "../ISerialState";
import { IBaseSignal } from "../IBaseSignal";

export declare interface ISerialSignal
    extends IBaseSignal<ISerialState, ISerialEventAction> {}
