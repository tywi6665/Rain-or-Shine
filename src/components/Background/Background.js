import React from 'react';
import "./Background.scss";

const Background = ({ dayOrNight }) => {
    console.log(dayOrNight)
    return (
        <div className="backgroundImage">
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