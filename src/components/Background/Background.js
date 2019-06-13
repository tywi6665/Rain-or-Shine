import React from 'react';
import "./Background.scss";

const Background = ({ dayOrNight }) => {
    console.log(dayOrNight)
    return (
        <div className={`backgroundImage ${dayOrNight}`}>
            {dayOrNight === "night" ? (
                <div className="moon">
                    <div className="moon-crater"></div>
                    <div className="moon-crater"></div>
                    <div className="moon-crater"></div>
                </div>
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
            )}
            <div className="mountains">
                            <div className="large-mountain-farleft"></div>
                            <div className="large-mountain-farright"></div>
                            <div className="small-mountain-left"></div>
                            <div className="small-mountain-right"></div>
                            <div className="medium-mountain-left"></div>
                            <div className="medium-mountain-right"></div>
                            <div className="large-mountain-left"></div>
                            <div className="large-mountain-right"></div>
                            <div className="medium-mountain-farleft"></div>
                            <div className="medium-mountain-farright"></div>
                        </div>
                    </div>
                );
            }
            
export default Background;