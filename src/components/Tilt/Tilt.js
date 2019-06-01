import React, { useState } from "react";
import { getPosition } from "./utils/getPosition";

const Tilt = ({ children }) => {

    const [position, setPosition] = useState({ x: 0, y: 0});
    const [transitionTime, setTranistionTime] = useState(null)

    return (
        <div className="tilt">
            <div className="innerTilt">
                {children}
            </div>
        </div>
    )
}

export default Tilt;