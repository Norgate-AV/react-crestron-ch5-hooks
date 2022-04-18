import React from "react";
import { useCrestronSubscribeAnalog } from "../hooks";

interface IProps {
    signalName: string;
}

export function UseCrestronSubscribeAnalogExample({ signalName }: IProps) {
    const [state] = useCrestronSubscribeAnalog(signalName);

    return <div>Analog State Subscription: {state}</div>;
}

export default UseCrestronSubscribeAnalogExample;
