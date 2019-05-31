import React from "react";
import "./Container.scss";

const Container = (props) => {
    return (
        <div className={`container ${props.gridArea}`}>
            {props.children}
        </div>
    )
};

export default Container;