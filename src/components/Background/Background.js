import React from 'react';
import "./Background.scss";

const Background = ({ dayOrNight }) => {
    console.log(dayOrNight)
    return (
        <div className={`backgroundImage ${dayOrNight}`}>
            {dayOrNight === "night" ? (
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
            <div className="clouds">
                <div className="cloud small-cloud cloud1"></div>
                <div className="cloud small-cloud cloud2"></div>
                <div className="cloud large-cloud cloud3"></div>
                <div className="cloud large-cloud cloud4"></div>
                <div className="cloud small-cloud cloud5"></div>
            </div>
            <div className="mountains">
                <div className="large-mountain-farleft"></div>
                <div className="large-mountain-farright"></div>
                <div className="small-mountain-left"></div>
                <div className="small-mountain-right"></div>
                <div className="medium-mountain-left"></div>
                <div className="medium-mountain-right"></div>
                <div className="large-mountain-left">
                    {/* <div className="large-mountain-cap"></div> */}
                </div>
                <div className="large-mountain-right"></div>
                <div className="medium-mountain-farleft"></div>
                <div className="medium-mountain-farright"></div>
            </div>
        </div>
    );
}

export default Background;