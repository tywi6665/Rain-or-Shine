import React from "react";
import "./WeatherDetail.scss";

const WeatherDetail = ({ children, weatherInfo, weatherCondition, translate }) => {
    return (
        <div className="weatherDetail">
            <p 
                className={weatherCondition}
                style={{
                    transform: `${(translate) ? (
                    `translateX(${(weatherInfo * 10) - 5}%)`) : (
                        ""
                    )}`
                }}
            >
            {weatherInfo}</p>
            {children}
            <p>{weatherCondition}</p>
            
        </div>
    )
};

export default WeatherDetail;