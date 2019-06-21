import React from "react";
import "weather-underground-icons";

const WeatherIcon = (props) => {
    return (
        <i className={`wu wu-black wu-${props.icon} wu-${props.dayOrNight} wu-${props.size} icon ${props.gridArea}`}></i>
    )
}

export default WeatherIcon;