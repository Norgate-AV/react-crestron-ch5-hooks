import React from "react";
import { render, screen } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
// import { subscribeState } from "@crestron/ch5-crcomlib";
// import CrestronCH5 from "@norgate-av/crestron-ch5-helper";
import { UseCrestronSubscribeAnalogExample } from "../components/useCrestronSubscribeAnalog.example";
// import { useCrestronSubscribeAnalog } from "../hooks/useCrestronSubscribeAnalog";
// import * as CrestronCH5Hooks from "../hooks";

// const signalType = CrestronCH5.SignalType.Analog;
const signalName = "ToInfinityAndBeyond";
// const useCrestronSubscribeAnalogMock = jest.spyOn(
//     CrestronCH5Hooks,
//     "useCrestronSubscribeAnalog",
// );

// const subscribeStateMock = jest.spyOn(subscribeState);
// const unsubscribeState = jest.spyOn(CrComLib, "unsubscribeState");
// type SubscribeStateCallback<T> = (value: T) => void;

describe("useCrestronSubscribeAnalog", () => {
    beforeAll(() => {
        render(<UseCrestronSubscribeAnalogExample signalName={signalName} />);
    });

    beforeEach(() => {
        // useCrestronSubscribeAnalogMock.mockClear();
        // subscribeStateMock.mockClear();
    });

    it("should render without crashing", () => {
        const title = screen.getByText(/useCrestronSubscribeAnalog/i);
        const signalName = screen.getByText(/Signal:/i);
        const value = screen.getByText(/Value:/i);

        expect(title).toBeInTheDocument();
        expect(signalName).toBeInTheDocument();
        expect(value).toBeInTheDocument();
    });

    // it("should render without crashing", () => {
    //     expect(useCrestronSubscribeAnalogMock).toHaveBeenCalledWith(signalName);
    //     expect(useCrestronSubscribeAnalogMock).toHaveBeenCalledTimes(1);
    //     expect(useCrestronSubscribeAnalogMock).toHaveReturnedWith(
    //         expect.arrayContaining<number>([]),
    //     );
    // });

    // it("should call Crestron subscribeState correctly", () => {
    //     expect(subscribeStateMock).toHaveBeenCalledWith(
    //         signalType,
    //         signalName,
    //         expect.any(Function),
    //     );

    //     expect(subscribeStateMock).toHaveBeenCalledTimes(1);
    //     expect(subscribeStateMock).toHaveReturnedWith(expect.any(String));
    // });

    // it("should not return undefined", () => {
    //     const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

    //     expect(result.current).not.toBe(undefined);
    // });

    // it("should return number array", () => {
    //     const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

    //     expect(result.current).toEqual(expect.arrayContaining([0]));
    // });

    // it("should call subscribeState() once", () => {
    //     const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

    //     expect(result.current).toEqual(expect.arrayContaining([0]));
    //     expect(subscribeState).toHaveBeenCalledTimes(1);
    //     expect(subscribeState).toHaveBeenCalledWith(
    //         signalType,
    //         "1",
    //         expect.any(Function),
    //     );
    // });
});
