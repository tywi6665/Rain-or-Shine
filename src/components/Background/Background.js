import React from 'react';
import "./Background.scss";

const Background = (props) => {
    return ( 
        <div className="backgroundImage">
            <div className="mountains">
                <div className="small-mountain-left"></div>
                <div className="small-mountain-right"></div>
                <div className="mountain-left"></div>
                <div className="mountain-right"></div>
            </div>
        </div>
     );
}
 
export default Background;