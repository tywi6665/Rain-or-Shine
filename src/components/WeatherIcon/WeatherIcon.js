import React from "react";
import "weather-underground-icons";
import "./WeatherIcon.scss";

const WeatherIcon = (props) => {
    return (
       <i className={`wu wu-black wu-64 wu-${props.icon}`}></i>
    )
}

export default WeatherIcon;