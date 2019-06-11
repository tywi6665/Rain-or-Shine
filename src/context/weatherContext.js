import React, { useState, useEffect, createContext } from 'react';
import API from "../utils/API";

export const WeatherContext = createContext();

export const WeatherProvider = props => {

    const [weather, setWeather] = useState({});

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