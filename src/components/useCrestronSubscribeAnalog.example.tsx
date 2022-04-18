import React from "react";
import { useCrestronSubscribeAnalog } from "../hooks";

export function UseCrestronSubscribeAnalogExample({
    signalName,
}: {
    signalName: string;
}) {
    const [state] = useCrestronSubscribeAnalog(
        signalName,
        (value, signalName) => {
            console.log(`Signal: ${signalName}, New Value: ${value}`);
        },
    );

    return (
        <div>
            <h1>useCrestronSubscribeAnalog</h1>
            <h2>Signal: {signalName}</h2>
            <h2>Value: {state}</h2>
        </div>
    );
}

export default UseCrestronSubscribeAnalogExample;
