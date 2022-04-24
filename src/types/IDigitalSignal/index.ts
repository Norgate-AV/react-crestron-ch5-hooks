import { IDigitalState } from "../IDigitalState";
import { IDigitalEventAction } from "../IDigitalEventAction";
import { IBaseSignal } from "../IBaseSignal";

export declare interface IDigitalSignal
    extends IBaseSignal<IDigitalState, IDigitalEventAction> {}
