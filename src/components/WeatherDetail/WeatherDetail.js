import React from "react";
import "./WeatherDetail.scss";

const WeatherDetail = ({ children, weatherInfo, weatherCondition, translate }) => {
    return (
        <div className="weatherDetail">
            {translate ? (
                    <p
                        className={weatherCondition}
                        style={{
                            textIndent: `${(weatherInfo * 10) - 10}%`
                        }}
                    >
                        {weatherInfo}</p>
            ) : (
                    <p
                        className={weatherCondition}
                    >
                        {weatherInfo}</p>
                )}

            {children}
            <p>{weatherCondition}</p>
        </div >
    )
};

export default WeatherDetail;