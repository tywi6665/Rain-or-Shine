import React from "react";
import "./WeatherDetail.scss";

const WeatherDetail = ({ children, weatherInfo, weatherCondition }) => {
    return (
        <div className="weatherDetail">
            <p>{weatherInfo}</p>
            {children}
            <p>{weatherCondition}</p>
            
        </div>
    )
};

export default WeatherDetail;