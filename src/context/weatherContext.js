import React, { useState, useEffect, createContext } from 'react';
import API from "../utils/API";

export const weatherContext = createContext();

export const weatherProvider = props => {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        API.getWeather()
            .then(res => {
                setWeather(res.data);
            })
    }, []);

    return (
        <WeatherContext.Provider value={[weather, setWeather]}>
            {props.children}
        </WeatherContext.Provider>
    );
};