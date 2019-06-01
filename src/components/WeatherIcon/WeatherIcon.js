import React from "react";
import "weather-underground-icons";
import "./WeatherIcon.scss";
import Tilt from "../Tilt";

const WeatherIcon = (props) => {
    return (
        <Tilt>
            <i className={`wu wu-black wu-${props.icon} wu-${props.dayOrNight} wu-256 icon`}></i>
        </Tilt>
    )
}

export default WeatherIcon;