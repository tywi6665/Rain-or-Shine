import React from "react";
import "weather-underground-icons";
import "./WeatherIcon.scss";

const WeatherIcon = (props) => {
    return (
            <i className={`wu wu-black wu-${props.icon} wu-${props.dayOrNight} wu-256 icon`}></i>
    )
}

export default WeatherIcon;