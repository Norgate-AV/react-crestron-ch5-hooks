import { IBaseEventAction } from "../IBaseEventAction";
import { Digital } from "../Digital";

export declare interface IDigitalEventAction extends IBaseEventAction<Digital> {
    push: () => void;
    release: () => void;
    click: () => void;
    // hold: (duration: number, callback: () => void) => void;
}
