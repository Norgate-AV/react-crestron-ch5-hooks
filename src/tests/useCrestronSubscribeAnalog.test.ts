// import { renderHook, act } from "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react";
// import CrComLib from "@crestron/ch5-crcomlib";
import { useCrestronSubscribeAnalog } from "../hooks/useCrestronSubscribeAnalog";

describe("useCrestronSubscribeAnalog", () => {
    test("should not return null", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        // act(() => {
        //     result.current.increment();
        // });
        // console.log(result.current);

        expect(result.current).not.toBe(null);
    });

    test("should not return undefined", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        // act(() => {
        //     result.current.increment();
        // });
        // console.log(result.current);

        expect(result.current).not.toBe(undefined);
    });

    test("should return number array", () => {
        const { result } = renderHook(() => useCrestronSubscribeAnalog("1"));

        // act(() => {
        //     result.current.increment();
        // });
        // console.log(result.current);

        expect(result.current).toEqual(expect.arrayContaining([0]));
    });
});
