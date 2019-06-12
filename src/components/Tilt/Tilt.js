import React, { useState, useCallback } from "react";
import { getPosition } from "./utils/getPosition";

const Tilt = ({ children }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [transitionTime, setTranistionTime] = useState(null)

    const enterTransitionTime = 100;
    const leaveTransitionTime = 250;
    const maxRotation = 0.2;
    const maxScale = 1;
    // const maxShadowDisplacement = 0.1;
    // const shadowRadius = "20px";
    // const shadowColor = "rgba(244, 167, 29, 0.9)";
    const perspective = "1000px";
    const easing = "ease-in-out";

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

    const hover = (position.x || position.y)

    return (
        <div
            className="tilt"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div
                className="innerTilt"
                style={{
                    // filter: (
                    //     hover ? (
                    //         `drop-shadow(
                    //             ${position.x * maxShadowDisplacement}px
                    //             ${position.y * maxShadowDisplacement}px
                    //             ${shadowRadius}
                    //             ${shadowColor}
                    //         )`
                    //     ) : (
                    //             ""
                    //         )
                    // ),
                    transform: `
                        perspective(${perspective})
                        rotateX(${maxRotation * position.y}deg)
                        rotateY(${-maxRotation * position.x}deg)
                        ${hover ? (
                            `scale3d(${maxScale}, ${maxScale}, ${maxScale})`
                        ) : (
                                ""
                            )}
                        `,
                    transition: (
                        transitionTime ? (
                            `transfrom ${transitionTime}ms ${easing},
                            filter ${transitionTime}ms ${easing}`
                        ) : (
                            ""
                        )
                    )

                }}
            >
                {children}
            </div>
        </div>
    )
}

export default Tilt;