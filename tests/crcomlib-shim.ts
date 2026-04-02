/**
 * Minimal stub for @crestron/ch5-crcomlib.
 *
 * The three functions below are the only ones used by the hooks under test.
 * Every test replaces them with vi.spyOn, so the real CrComLib bundle never
 * needs to be loaded. This avoids the costly initialization of the full
 * Crestron webpack bundle during test runs.
 */

let _subscriptionCounter = 0;

export function subscribeState(
    _type: string,
    _name: string,
    _callback: (value: unknown) => void,
): string {
    return String(++_subscriptionCounter);
}

export function unsubscribeState(
    _type: string,
    _name: string,
    _id: string,
): void {}

export function publishEvent(
    _type: string,
    _name: string,
    _value: unknown,
): void {}
