import React, { useState, useCallback } from "react";
import { getPosition } from "./utils/getPosition";

const Tilt = ({ children }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [transitionTime, setTranistionTime] = useState(null)

    const enterTransitionTime = 100;
    const leaveTransitionTime = 250;

    const onMouseEnter = useCallback(
        (e) => {
            setPosition(getPosition(e));
            setTimeout(() => {
                setTranistionTime(0);
            }, transitionTime);
        },
        []
    );

    const onMouseMove = useCallback(
        (e) => {
            if (!transitionTime) {
                setPosition(getPosition(e));
            }
        },
        [transitionTime]
    );

    const onMouseLeave = useCallback(
        (e) => {
            setTranistionTime(leaveTransitionTime);
            setTimeout(() => {
                setTranistionTime(enterTransitionTime);
            });
            setPosition({ x: 0, y: 0 });
        },
        []
    );

    return (
        <div
            className="tilt"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="innerTilt">
                {children}
            </div>
        </div>
    )
}

export default Tilt;