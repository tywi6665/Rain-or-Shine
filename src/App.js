import React, { useState, useEffect } from 'react';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetail from "./components/WeatherDetail";
import Tilt from "./components/Tilt";
import API from "./utils/API";
import './App.scss';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [minuteWeather, setMinuteWeather] = useState(null)
  const [hourWeather, setHourWeather] = useState(null)
  const [dailyWeather, setDailyWeather] = useState(null)
  const [dayOrNight, setDayOrNight] = useState("")
  //use sun rise/set time from dailyWeather

  useEffect(() => {
    API.getWeather()
      .then(res => {
        let currently = res.data.currently;
        let hourly = res.data.hourly.data;
        let daily = res.data.daily.data;
        currently.icon = currently.icon.replace(/-/g, "").replace("day", "").replace("night", "");
        currently.windBearing = degToCardinal(currently.windBearing)
        setDailyWeather(daily);
        setCurrentWeather(currently);
        if (Date.now() < daily.sunsetTime) {
          setDayOrNight("night");
        } else {
          setDayOrNight("day");
        }
      })
  }, []);

  function degToCardinal(windBearing) {
    const cardinalDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    let value = Math.floor((windBearing / 22.5) + 0.5);
    return cardinalDirections[(value % 16)];
  };

  console.log(currentWeather)
  console.log(dailyWeather);

  return (
    <div className="app">
      <Container
        gridArea={"header"}
      >
        <p>Welcome to Rain or Shine!</p>
        <div className="scrollingText">
          {dailyWeather ? (
            <p>{dailyWeather[0].summary}</p>
          ) : (
              null
            )}
        </div>
      </Container>
      {currentWeather ? (
        <>
          <Tilt>
            <Container
              gridArea={"weatherIcon"}
            >
              <WeatherIcon
                icon={currentWeather.icon}
                dayOrNight={dayOrNight}
              />
            </Container>
          </Tilt>
          <Container
            gridArea={"details"}
          >
            <WeatherDetail
              weatherCondition={"Temperature(F)"}
              weatherInfo={currentWeather.temperature}
            />
            <WeatherDetail
              weatherCondition={"Humidity"}
              weatherInfo={currentWeather.humidity}
            />
            <WeatherDetail
              weatherCondition={"Chance of Precipitation"}
              weatherInfo={`${currentWeather.precipProbability}%`}
            />
            <WeatherDetail
              weatherCondition={"Wind Speed(mph)"}
              weatherInfo={`${currentWeather.windSpeed}`}
            />
            <WeatherDetail
              weatherCondition={"Wind Direction"}
              weatherInfo={currentWeather.windBearing}
            />
            <WeatherDetail
              weatherCondition={"UV Index"}
              weatherInfo={currentWeather.uvIndex}
            />
          </Container>
        </>
      ) : (
          <p>Retrieving Weather</p>
        )}
    </div>
  );
}

export default App;
