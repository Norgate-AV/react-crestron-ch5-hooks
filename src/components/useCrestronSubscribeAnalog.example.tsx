import React from "react";
import { useCrestronSubscribeAnalog } from "../hooks/index.js";
import { AnalogStateCallback } from "../@types/index.js";
import { BaseSubscribeStateComponent } from "./BaseSubscribeStateComponent.js";

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
            value={state.value}
        />
    );
}

export default UseCrestronSubscribeAnalogExample;
