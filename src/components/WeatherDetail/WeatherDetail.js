import React from "react";
import "./WeatherDetail.scss";

const WeatherDetail = (props) => {
    return (
        <div className="weatherDetail">
            <div>{props.weatherInfo}</div>
            <div>{props.weatherCondition}</div>
        </div>
    )
};

export default WeatherDetail;