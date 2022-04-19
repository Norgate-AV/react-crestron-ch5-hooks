import React from "react";

export function BaseSubscribeStateComponent({
    description,
    signalName,
    value,
}: {
    description: string;
    signalName: string;
    value: number | boolean | string;
}) {
    return (
        <div>
            <h1>{description}</h1>
            <h2>Signal: {signalName}</h2>
            <h2>Value: {value}</h2>
        </div>
    );
}

export default BaseSubscribeStateComponent;
