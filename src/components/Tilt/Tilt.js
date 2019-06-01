import React, { useState, useCallback } from "react";
import { getPosition } from "./utils/getPosition";

const Tilt = ({ children }) => {

    const [position, setPosition] = useState({ x: 0, y: 0});
    const [transitionTime, setTranistionTime] = useState(null)

    const onMouseEnter = useCallback(
        (e) => {
            setPosition(getPosition(e));
            setTimeout(() => {
                setTranistionTime(0);
            }, transitionTime);
        }, 
        []
    );

    const onMouseMove = useCallBack(
        (e) => {
            if(!transitionTime) {
                setPosition(getPosition(e));
            }
        },
        [transitionTime]
    );

    const onMouseLeave = useCallback(
        (e) => {

        },
        []
    );

    return (
        <div className="tilt">
            <div className="innerTilt">
                {children}
            </div>
        </div>
    )
}

export default Tilt;