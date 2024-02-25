import { Digital, IBaseEventAction } from "./index.js";

export declare interface IDigitalEventAction extends IBaseEventAction<Digital> {
    push: () => void;
    release: () => void;
    click: () => void;
    // hold: (duration: number, callback: () => void) => void;
}
