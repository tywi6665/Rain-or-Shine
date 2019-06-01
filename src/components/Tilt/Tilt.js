import React, { useState } from "react";

const Tilt = ({ children }) => {


    return (
        <div className="tilt">
            <div className="innerTilt">
                {children}
            </div>
        </div>
    )
}

export default Tilt;