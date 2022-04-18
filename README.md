# React Crestron CH5 Hooks 🪝🪝

<div align="center">
	<img src="./assets/logo.svg" alt="react-logo" width="200" />
	<img src="./assets/crestron-ch5-logo.png" alt="ch5-logo" width="200" />
</div>

---

[![CI](https://github.com/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/actions/workflows/main.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**NOTE**

This library is currently in development. When it is ready to use, there will be a release posted here and the package will be published to NPM.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Contents**

-   [Installation ⚡️](#installation-%EF%B8%8F)
-   [Usage 🚀](#usage-)
    -   [useCrestronSubscribeAnalog 🪝](#usecrestronsubscribeanalog-%F0%9F%AA%9D)
        -   [with optional callback](#with-optional-callback)
-   [Types](#types)
    -   [Aliases](#aliases)
        -   [Analog](#analog)
        -   [Digital](#digital)
        -   [Serial](#serial)
    -   [Event Actions](#event-actions)
        -   [IBaseAction](#ibaseaction)
        -   [IAnalogAction](#ianalogaction)
        -   [IDigitalAction](#idigitalaction)
        -   [ISerialAction](#iserialaction)
-   [Team](#team)
-   [Contributors ✨](#contributors-)
-   [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation ⚡️

```sh
npm install @norgate-av/react-crestron-ch5-hooks

# or

yarn add @norgate-av/react-crestron-ch5-hooks
```

## Usage 🚀

### useCrestronSubscribeAnalog 🪝

```tsx
import { useCrestronSubscribeAnalog } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent: React.FC = () => {
    const [value] = useCrestronSubscribeAnalog("some-analog-id");

    return (
        <div>
            <h1>{value}</h1>
        </div>
    );
};

export default SomeAwesomeComponent;
```

#### with optional callback

```tsx
import { useCrestronSubscribeAnalog } from "@norgate-av/react-crestron-ch5-hooks";

export const SomeAwesomeComponent: React.FC = () => {
    const [value] = useCrestronSubscribeAnalog("some-analog-id", (value) => {
        console.log(`New Value: ${value}`);
    });

    return (
        <div>
            <h1>{value}</h1>
        </div>
    );
};

export default SomeAwesomeComponent;
```

## Types

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

#### IBaseAction

```ts
export declare interface IBaseAction<T> {
    setValue: (value: T) => void;
}
```

#### IAnalogAction

```ts
export declare interface IAnalogAction extends IBaseAction<Analog> {}
```

#### IDigitalAction

```ts
export declare interface IDigitalAction extends IBaseAction<Digital> {
    push: () => void;
    release: () => void;
    click: () => void;
}
```

#### ISerialAction

```ts
export declare interface ISerialAction extends IBaseAction<Serial> {}
```

## Team

This project is maintained by the following person(s) and a bunch of [awesome contributors](https://github.com/Norgate-AV-Solutions-Ltd/react-crestron-ch5-hooks/graphs/contributors).

| [![Damien Butt](https://github.com/damienbutt.png?size=100)](https://github.com/damienbutt) |
| ------------------------------------------------------------------------------------------- |
| [Damien Butt](https://github.com/damienbutt)                                                |

## Contributors ✨

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

## LICENSE

[MIT](LICENSE)
