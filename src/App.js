import React, { useState, useEffect } from 'react';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetail from "./components/WeatherDetail";
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
        setCurrentWeather(currently);
        if (Date.now() < daily.sunsetTime) {
          setDayOrNight("night");
        } else {
          setDayOrNight("day");
        }
      })
  }, []);

  console.log(currentWeather, dayOrNight, Date.now())

  return (
    <div className="App">
      <Container>
        <p>Welcome to Rain or Shine!</p>
      </Container>
      {currentWeather ? (
        <>
          <Container>
            <WeatherIcon
              icon={currentWeather.icon}
              dayOrNight={dayOrNight}
            />
          </Container>
          <Container>
            <WeatherDetail
              weatherCondition={"Temperature"}
              weatherInfo={currentWeather.temperature}
            />
            <WeatherDetail
              weatherCondition={"Wind Speed"}
              weatherInfo={currentWeather.windSpeed}
            />
            <WeatherDetail
              weatherCondition={"Wind Direction"}
              weatherInfo={"NNW"}
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
