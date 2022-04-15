declare interface DigitalAction {
    push: () => void;
    release: () => void;
    click: () => void;
    hold: (duration: number, callback: () => void) => void;
}
