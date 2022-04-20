import React from "react";
import { useCrestronSubscribeAnalog } from "../hooks";
import { AnalogStateCallback } from "../types";
import { BaseSubscribeStateComponent } from "./BaseSubscribeStateComponent";

export function UseCrestronSubscribeAnalogExample({
    description,
    signalName,
    callback,
}: {
    description: string;
    signalName: string;
    callback: AnalogStateCallback;
}) {
    const [state] = useCrestronSubscribeAnalog(signalName, callback);

    return (
        <BaseSubscribeStateComponent
            description={description}
            signalName={signalName}
            value={state}
        />
    );
}

export default UseCrestronSubscribeAnalogExample;
