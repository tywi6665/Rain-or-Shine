import { useState, useEffect } from "react";

export const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = document.querySelector(".weatherIcon");
        const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
        container.addEventListener("mousemove", setFromEvent);

        return () => {
            container.removeEventListener("mousemove", setFromEvent);
        };
    }, []);

    return position;
}