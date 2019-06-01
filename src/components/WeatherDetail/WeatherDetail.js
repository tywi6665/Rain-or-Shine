import React from "react";
import "./WeatherDetail.scss";

const WeatherDetail = (props) => {
    return (
        <div className="weatherDetail">
            <p>{props.weatherInfo}</p>
            <p>{props.weatherCondition}</p>
        </div>
    )
};

export default WeatherDetail;