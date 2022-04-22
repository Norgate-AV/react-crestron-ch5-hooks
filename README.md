# React Crestron CH5 Hooks ⚓

<div align="center">
	<img src="./assets/logo.svg" alt="react-logo" width="200" />
	<img src="./assets/crestron-ch5-logo.png" alt="ch5-logo" width="200" />
</div>

---

[![CI](https://github.com/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/branch/develop/graph/badge.svg?token=ZA36O8UTSI)](https://codecov.io/gh/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks)
[![Coverage Status](https://coveralls.io/repos/github/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/badge.svg?branch=develop)](https://coveralls.io/github/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks?branch=develop)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub contributors](https://img.shields.io/github/contributors/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks)](#contributors)
[![NPM](https://img.shields.io/npm/v/@norgate-av/react-crestron-ch5-hooks.svg)](https://www.npmjs.com/package/@norgate-av/react-crestron-ch5-hooks)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

A collection of React custom hooks ⚓ for Crestron CH5 project development.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Contents 📖

-   [Features 📦](#features-)
-   [Installation ⚡️](#installation-%EF%B8%8F)
-   [Usage 🚀](#usage-)
    -   [Publish :arrow_right:](#publish-arrow_right)
        -   [useCrestronPublishAnalog](#usecrestronpublishanalog)
        -   [useCrestronPublishDigital](#usecrestronpublishdigital)
        -   [useCrestronPublishSerial](#usecrestronpublishserial)
        -   [useCrestronPublishAnalogCollection](#usecrestronpublishanalogcollection)
        -   [useCrestronPublishDigitalCollection](#usecrestronpublishdigitalcollection)
        -   [useCrestronPublishSerialCollection](#usecrestronpublishserialcollection)
    -   [Subscribe ⬅️](#subscribe-)
        -   [useCrestronSubscribeAnalog](#usecrestronsubscribeanalog)
        -   [useCrestronSubscribeDigital](#usecrestronsubscribedigital)
        -   [useCrestronSubscribeSerial](#usecrestronsubscribeserial)
        -   [useCrestronSubscribeAnalogCollection](#usecrestronsubscribeanalogcollection)
        -   [useCrestronSubscribeDigitalCollection](#usecrestronsubscribedigitalcollection)
        -   [useCrestronSubscribeSerialCollection](#usecrestronsubscribeserialcollection)
    -   [Publish & Subscribe :left_right_arrow:](#publish--subscribe-left_right_arrow)
        -   [useCrestronAnalog](#usecrestronanalog)
        -   [useCrestronDigital](#usecrestrondigital)
        -   [useCrestronSerial](#usecrestronserial)
        -   [useCrestronAnalogCollection](#usecrestronanalogcollection)
        -   [useCrestronDigitalCollection](#usecrestrondigitalcollection)
        -   [useCrestronSerialCollection](#usecrestronserialcollection)
    -   [Optional Callback :phone:](#optional-callback-phone)
-   [Types ⌨️](#types-)
    -   [Aliases](#aliases)
        -   [Analog](#analog)
        -   [Digital](#digital)
        -   [Serial](#serial)
    -   [Event Actions](#event-actions)
        -   [IBaseEventAction](#ibaseeventaction)
        -   [IAnalogEventAction](#ianalogeventaction)
        -   [IDigitalEventAction](#idigitaleventaction)
        -   [ISerialEventAction](#iserialeventaction)
    -   [State](#state)
        -   [IBaseState](#ibasestate)
        -   [IAnalogState](#ianalogstate)
        -   [IDigitalState](#idigitalstate)
        -   [ISerialState](#iserialstate)
        -   [IStateSubscription](#istatesubscription)
        -   [StateCallback](#statecallback)
        -   [AnalogStateCallback](#analogstatecallback)
        -   [DigitalStateCallback](#digitalstatecallback)
        -   [SerialStateCallback](#serialstatecallback)
    -   [Signals](#signals)
        -   [IBaseSignal](#ibasesignal)
        -   [IAnalogSignal](#ianalogsignal)
        -   [IDigitalSignal](#idigitalsignal)
        -   [ISerialSignal](#iserialsignal)
-   [Team ⚽](#team-)
-   [Contributors ✨](#contributors-)
-   [LICENSE :balance_scale:](#license-balance_scale)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features 📦

✅ Collection of 18 hooks

✅ CommonJS, UMD and ESM Support

✅ Built-in Type definitions for TypeScript

## Installation ⚡️

```sh
npm install @norgate-av/react-crestron-ch5-hooks

# or

yarn add @norgate-av/react-crestron-ch5-hooks
```

## Usage 🚀

### Publish :arrow_right:

#### useCrestronPublishAnalog

```tsx
import { useCrestronPublishAnalog } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [action] = useCrestronPublishAnalog("some-analog-join-or-name");

    return (
        <div>
            <h1>Analog Event Actions</h1>
            <button onClick={() => action.setValue(666)}>Set Value</button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronPublishDigital

```tsx
import { useCrestronPublishDigital } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [action] = useCrestronPublishDigital("some-digital-join-or-name");

    return (
        <div>
            <h1>Digital Event Actions</h1>
            <button onClick={() => action.setValue(true)}>
                Set Value True
            </button>
            <button onClick={() => action.setValue(false)}>
                Set Value False
            </button>
            <button onClick={() => action.push()}>Push</button>
            <button onClick={() => action.release()}>Release</button>
            <button onClick={() => action.click()}>Click</button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronPublishSerial

```tsx
import { useCrestronPublishSerial } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [action] = useCrestronPublishSerial("some-serial-join-or-name");

    return (
        <div>
            <h1>Serial Event Actions</h1>
            <button onClick={() => action.setValue("cowbell")}>
                Set Value
            </button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronPublishAnalogCollection

```tsx
import { useCrestronPublishAnalogCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [action1, action2, action3] = useCrestronPublishAnalogCollection([
        "some-analog-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Analog Event Actions Collection</h1>
            <button onClick={() => action1.setValue(666)}>Set Value 1</button>
            <button onClick={() => action2.setValue(666)}>Set Value 2</button>
            <button onClick={() => action3.setValue(666)}>Set Value 3</button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronPublishDigitalCollection

```tsx
import { useCrestronPublishDigitalCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [action1, action2, action3] = useCrestronPublishDigitalCollection([
        "some-digital-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Digital Event Actions Collection</h1>
            <button onClick={() => action1.setValue(true)}>
                Set Value 1 True
            </button>
            <button onClick={() => action1.setValue(false)}>
                Set Value 1 False
            </button>
            <button onClick={() => action1.push()}>Push 1</button>
            <button onClick={() => action1.release()}>Release 1</button>
            <button onClick={() => action1.click()}>Click 1</button>

            <button onClick={() => action2.setValue(true)}>
                Set Value 2 True
            </button>
            <button onClick={() => action2.setValue(false)}>
                Set Value 2 False
            </button>
            <button onClick={() => action2.push()}>Push 2</button>
            <button onClick={() => action2.release()}>Release 2</button>
            <button onClick={() => action2.click()}>Click 2</button>

            <button onClick={() => action3.setValue(true)}>
                Set Value 3 True
            </button>
            <button onClick={() => action3.setValue(false)}>
                Set Value 3 False
            </button>
            <button onClick={() => action3.push()}>Push 3</button>
            <button onClick={() => action3.release()}>Release 3</button>
            <button onClick={() => action3.click()}>Click 3</button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronPublishSerialCollection

```tsx
import { useCrestronPublishSerialCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [action1, action2, action3] = useCrestronPublishSerialCollection([
        "some-serial-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Serial Event Actions Collection</h1>
            <button onClick={() => action1.setValue("cowbell")}>
                Set Value 1
            </button>
            <button onClick={() => action2.setValue("cowbell")}>
                Set Value 2
            </button>
            <button
                onClick={() =>
                    action3.setValue("That's enough cowbell for now!")
                }
            >
                Set Value 3
            </button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

### Subscribe ⬅️

#### useCrestronSubscribeAnalog

```tsx
import { useCrestronSubscribeAnalog } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state] = useCrestronSubscribeAnalog("some-analog-join-or-name");

    return (
        <div>
            <h1>Analog State</h1>
            <h2>Value: {state.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSubscribeDigital

```tsx
import { useCrestronSubscribeDigital } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state] = useCrestronSubscribeDigital("some-digital-join-or-name");

    return (
        <div>
            <h1>Digital State</h1>
            <h2>Value: {state.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSubscribeSerial

```tsx
import { useCrestronSubscribeSerial } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state] = useCrestronSubscribeSerial("some-serial-join-or-name");

    return (
        <div>
            <h1>Serial State</h1>
            <h2>Value: {state.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSubscribeAnalogCollection

```tsx
import { useCrestronSubscribeAnalogCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state1, state2, state3] = useCrestronSubscribeAnalogCollection([
        "some-analog-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Analog State Collection</h1>
            <h2>Value 1: {state1.value}</h2>
            <h2>Value 2: {state2.value}</h2>
            <h2>Value 3: {state3.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSubscribeDigitalCollection

```tsx
import { useCrestronSubscribeDigitalCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state1, state2, state3] = useCrestronSubscribeDigitalCollection([
        "some-digital-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Digital State Collection</h1>
            <h2>Value 1: {state1.value}</h2>
            <h2>Value 2: {state2.value}</h2>
            <h2>Value 3: {state3.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSubscribeSerialCollection

```tsx
import { useCrestronSubscribeSerialCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state1, state2, state3] = useCrestronSubscribeSerialCollection([
        "some-serial-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Serial State Collection</h1>
            <h2>Value 1: {state1.value}</h2>
            <h2>Value 2: {state2.value}</h2>
            <h2>Value 3: {state3.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

### Publish & Subscribe :left_right_arrow:

#### useCrestronAnalog

```tsx
import { useCrestronAnalog } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [signal] = useCrestronAnalog("some-analog-join-or-name");

    return (
        <div>
            <h1>Analog Signal</h1>
            <h2>Value: {signal.state.value}</h2>
            <button onClick={() => signal.action.setValue(666)}>
                Set Value
            </button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronDigital

```tsx
import { useCrestronDigital } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [signal] = useCrestronDigital("some-digital-join-or-name");

    return (
        <div>
            <h1>Digital Signal</h1>
            <h2>Value: {signal.state.value}</h2>
            <button onClick={() => signal.action.setValue(true)}>
                Set Value True
            </button>
            <button onClick={() => signal.action.setValue(false)}>
                Set Value False
            </button>
            <button onClick={() => signal.action.push()}>Push</button>
            <button onClick={() => signal.action.release()}>Release</button>
            <button onClick={() => signal.action.click()}>Click</button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSerial

```tsx
import { useCrestronSerial } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [signal] = useCrestronSerial("some-serial-join-or-name");

    return (
        <div>
            <h1>Serial Signal</h1>
            <h2>Value: {signal.state.value}</h2>
            <button onClick={() => signal.action.setValue("cowbell")}>
                Set Value
            </button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronAnalogCollection

```tsx
import { useCrestronAnalogCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [signal1, signal2, signal3] = useCrestronAnalogCollection([
        "some-analog-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Analog Signal Collection</h1>
            <h2>Value 1: {signal1.state.value}</h2>
            <h2>Value 2: {signal2.state.value}</h2>
            <h2>Value 3: {signal3.state.value}</h2>

            <button onClick={() => signal1.action.setValue(666)}>
                Set Value 1
            </button>
            <button onClick={() => signal2.action.setValue(666)}>
                Set Value 2
            </button>
            <button onClick={() => signal3.action.setValue(666)}>
                Set Value 3
            </button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronDigitalCollection

```tsx
import { useCrestronDigitalCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [signal1, signal2, signal3] = useCrestronDigitalCollection([
        "some-digital-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Digital Signal Collection</h1>
            <h2>Value 1: {signal1.state.value}</h2>
            <h2>Value 2: {signal2.state.value}</h2>
            <h2>Value 3: {signal3.state.value}</h2>

            <button onClick={() => signal1.action.setValue(true)}>
                Set Value 1 True
            </button>
            <button onClick={() => signal1.action.setValue(false)}>
                Set Value 1 False
            </button>
            <button onClick={() => signal1.action.push()}>Push 1</button>
            <button onClick={() => signal1.action.release()}>Release 1</button>
            <button onClick={() => signal1.action.click()}>Click 1</button>

            <button onClick={() => signal2.action.setValue(true)}>
                Set Value 2 True
            </button>
            <button onClick={() => signal2.action.setValue(false)}>
                Set Value 2 False
            </button>
            <button onClick={() => signal2.action.push()}>Push 2</button>
            <button onClick={() => signal2.action.release()}>Release 2</button>
            <button onClick={() => signal2.action.click()}>Click 2</button>

            <button onClick={() => signal3.action.setValue(true)}>
                Set Value 3 True
            </button>
            <button onClick={() => signal3.action.setValue(false)}>
                Set Value 3 False
            </button>
            <button onClick={() => signal3.action.push()}>Push 3</button>
            <button onClick={() => signal3.action.release()}>Release 3</button>
            <button onClick={() => signal3.action.click()}>Click 3</button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### useCrestronSerialCollection

```tsx
import { useCrestronSerialCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [signal1, signal2, signal3] = useCrestronSerialCollection([
        "some-serial-join-or-name",
        "2",
        "3",
    ]);

    return (
        <div>
            <h1>Serial Signal Collection</h1>
            <h2>Value 1: {signal1.state.value}</h2>
            <h2>Value 2: {signal2.state.value}</h2>
            <h2>Value 3: {signal3.state.value}</h2>

            <button onClick={() => action1.setValue("cowbell")}>
                Set Value 1
            </button>
            <button onClick={() => action2.setValue("cowbell")}>
                Set Value 2
            </button>
            <button
                onClick={() =>
                    action3.setValue("That's enough cowbell for now!")
                }
            >
                Set Value 3
            </button>
        </div>
    );
};

export default SomeAwesomeComponent;
```

### Optional Subscribe Callback :phone:

All hooks that subscribe to state can be passed an optional [callback](#statecallback) to be called when the state changes.

```tsx
import { useCrestronSubscribeAnalogCollection } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state1, state2, state3] = useCrestronSubscribeAnalogCollection(
        ["some-analog-join-or-name", "2", "3"],
        (value, signalName) => {
            console.log(`Signal: ${signalName}, New Value: ${value}`);
        },
    );

    return (
        <div>
            <h1>Analog State Collection</h1>
            <h2>Value 1: {state1.value}</h2>
            <h2>Value 2: {state2.value}</h2>
            <h2>Value 3: {state3.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

The `signalName` parameter on the [callback](#statecallback) is also optional and can be omitted if you only have one signal.

```tsx
import { useCrestronSubscribeAnalog } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent = () => {
    const [state] = useCrestronSubscribeAnalog(
        "some-analog-join-or-name",
        (value) => {
            console.log(`New Value: ${value}`);
        },
    );

    return (
        <div>
            <h1>Analog State</h1>
            <h2>Value: {state.value}</h2>
        </div>
    );
};

export default SomeAwesomeComponent;
```

## Types ⌨️

### Aliases

#### Analog

```ts
export declare type Analog = number;
```

#### Digital

```ts
export declare type Digital = boolean;
```

#### Serial

```ts
export declare type Serial = string;
```

### Event Actions

#### IBaseEventAction

```ts
export declare interface IBaseEventAction<T> {
    setValue: (value: T) => void;
}
```

#### IAnalogEventAction

```ts
export declare interface IAnalogEventAction extends IBaseEventAction<Analog> {}
```

#### IDigitalEventAction

```ts
export declare interface IDigitalEventAction extends IBaseEventAction<Digital> {
    push: () => void;
    release: () => void;
    click: () => void;
}
```

#### ISerialEventAction

```ts
export declare interface ISerialEventAction extends IBaseEventAction<Serial> {}
```

### State

#### IBaseState

```ts
export declare interface IBaseState<T> {
    value: T;
}
```

#### IAnalogState

```ts
export declare interface IAnalogState extends IBaseState<Analog> {}
```

#### IDigitalState

```ts
export declare interface IDigitalState extends IBaseState<Digital> {}
```

#### ISerialState

```ts
export declare interface ISerialState extends IBaseState<Serial> {}
```

#### IStateSubscription

```ts
export declare interface IStateSubscription {
    id: string;
    signalName: string;
}
```

#### StateCallback

```ts
export declare type StateCallback<T> = (value: T, signalName?: string) => void;
```

#### AnalogStateCallback

```ts
export declare type AnalogStateCallback = StateCallback<Analog>;
```

#### DigitalStateCallback

```ts
export declare type DigitalStateCallback = StateCallback<Digital>;
```

#### SerialStateCallback

```ts
export declare type SerialStateCallback = StateCallback<Serial>;
```

### Signals

#### IBaseSignal

```ts
export declare interface IBaseSignal<TState, TAction> {
    state: TState;
    action: TAction;
}
```

#### IAnalogSignal

```ts
export declare interface IAnalogSignal
    extends IBaseSignal<IAnalogState, IAnalogEventAction> {}
```

#### IDigitalSignal

```ts
export declare interface IDigitalSignal
    extends IBaseSignal<IDigitalState, IDigitalEventAction> {}
```

#### ISerialSignal

```ts
export declare interface ISerialSignal
    extends IBaseSignal<ISerialState, ISerialEventAction> {}
```

## Team ⚽

This project is maintained by the following person(s) and a bunch of [awesome contributors](https://github.com/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/graphs/contributors).

<table>
  <tr>
    <td align="center"><a href="https://github.com/damienbutt"><img src="https://avatars.githubusercontent.com/damienbutt?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damien Butt</b></sub></a><br /></td>
  </tr>
</table>

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks go to these awesome people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/features/security"><img src="https://avatars.githubusercontent.com/u/27347476?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dependabot</b></sub></a><br /><a href="#maintenance-dependabot" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!

## LICENSE :balance_scale:

[MIT](LICENSE)
