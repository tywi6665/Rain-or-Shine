import React, { useState, createContext } from 'react';

export const weatherContext = createContext();

export const weatherProvider = props => {


    return (
        <WeatherContext.Provider>
            {props.children}
        </WeatherContext.Provider>
    )
}