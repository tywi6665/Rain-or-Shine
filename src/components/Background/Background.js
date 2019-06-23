import React from 'react';
import "./Background.scss";
import WeatherDetail from '../WeatherDetail';

const Background = ({ dayOrNight, currentWeather }) => {

    function rainOrSnow() {
        const length = 150;
        let array = [...Array(length).keys()];
        return (
            <div className={`${currentWeather}ing`}>
                {
                    array.map(index => (
                        <i className={currentWeather} key={index}></i>
                    ))
                }
            </div>

        );
    };

    return (
        <div className={`backgroundImage ${dayOrNight} ${currentWeather}-background`}>
            {currentWeather === "cloudy" || currentWeather === "rain" || currentWeather === "snow" || currentWeather === "fog" ? [
                (<>
                    <div
                        className="sky"
                        style={{ background: "linear-gradient(to bottom, darkgrey, #ffffff)" }}
                    ></div>
                    <div className="shelf-cloud">
                        <div className="shelf-cloud-left"></div>
                        <div className="shelf-cloud-right"></div>
                    </div>
                </>),
                (currentWeather === "rain" || currentWeather === "snow" ? (
                    rainOrSnow()
                ) : (
                        null
                    ))
            ] : [
                    (<div
                        className="sky"
                        style={{ background: "linear-gradient(to bottom, #845EC2, #D65DB1, #FF6F91, #FF9671, #FFC75F, #F9F871)" }}
                    >
                    </div>),
                    (dayOrNight === "night" ? (
                        <>
                            <div className="stars">
                                <div className="star-group1"></div>
                                <div className="star-group2"></div>
                                <div className="star-group3"></div>
                            </div>
                            <div className="moon">
                                <div className="crater crater1"></div>
                                <div className="crater crater2"></div>
                                <div className="crater crater3"></div>
                            </div>
                        </>
                    ) : (
                        currentWeather === "cloudy" || currentWeather === "rain" || currentWeather === "snow" || currentWeather === "fog" ? (
                                null
                            ) : (
                                    <div className="sun">
                                        <div className="ray-container">
                                            <div className="ray ray1"></div>
                                            <div className="ray ray2"></div>
                                            <div className="ray ray3"></div>
                                            <div className="ray ray4"></div>
                                            <div className="ray ray5"></div>
                                            <div className="ray ray6"></div>
                                            <div className="ray ray7"></div>
                                            <div className="ray ray8"></div>
                                            <div className="ray ray9"></div>
                                            <div className="ray ray10"></div>
                                        </div>
                                    </div>
                                )

                        ))
                ]}
            <div className="clouds">
                <div className="cloud small-cloud cloud1"></div>
                <div className="cloud small-cloud cloud2"></div>
                <div className="cloud large-cloud cloud3"></div>
                <div className="cloud large-cloud cloud4"></div>
                <div className="cloud small-cloud cloud5"></div>
            </div>
            <div className="mountains">
                <div className={`large-mountain-farleft ${currentWeather === "snow" ? "snow-cap-left" : ""}`}></div>
                <div className={`large-mountain-farright ${currentWeather === "snow" ? "snow-cap-right" : ""}`}></div>
                <div className={`small-mountain-left ${currentWeather === "snow" ? "snow-cap-left" : ""}`}></div>
                <div className={`small-mountain-right ${currentWeather === "snow" ? "snow-cap-right" : ""}`}></div>
                <div className={`medium-mountain-left ${currentWeather === "snow" ? "snow-cap-left" : ""}`}></div>
                <div className={`medium-mountain-right ${currentWeather === "snow" ? "snow-cap-right" : ""}`}></div>
                <div className={`large-mountain-left ${currentWeather === "snow" ? "snow-cap-left" : ""}`}></div>
                <div className={`large-mountain-right ${currentWeather === "snow" ? "snow-cap-right" : ""}`}></div>
                <div className={`medium-mountain-farleft ${currentWeather === "snow" ? "snow-cap-left" : ""}`}></div>
                <div className={`medium-mountain-farright ${currentWeather === "snow" ? "snow-cap-right" : ""}`}></div>
            </div>
        </div>
    );
}

export default Background;