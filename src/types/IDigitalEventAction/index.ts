import { IBaseAction } from "../IBaseAction";
import { Digital } from "../Digital";

export declare interface IDigitalEventAction extends IBaseAction<Digital> {
    push: () => void;
    release: () => void;
    click: () => void;
    // hold: (duration: number, callback: () => void) => void;
}