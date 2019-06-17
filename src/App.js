import React, { useState, useEffect, useContext } from 'react';
import Background from './components/Background/Background';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetail from "./components/WeatherDetail";
import Tilt from "./components/Tilt";
import ForecastPlot from "./components/ForecastPlot";
import { Icon, Modal } from 'antd';
import API from "./utils/API";
import './App.scss';
// import { WeatherProvider } from './context/weatherContext';

function App() {

  // const [weather, setWeather] = useContext(WeatherContext)

  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [dayOrNight, setDayOrNight] = useState("");
  const [isMetric, setIsMetric] = useState(false);

  useEffect(() => {
    API.getWeather()
      .then(res => {
        let currently = res.data.currently;
        let daily = res.data.daily.data;
        currently.icon = currently.icon.replace(/-/g, "").replace("day", "").replace("night", "");
        currently.windBearing = degToCardinal(currently.windBearing)
        setDailyWeather(daily);
        setCurrentWeather(currently);
        let modifiedCurrentTime = Number(Date.now().toString().slice(0, 10));
        if (modifiedCurrentTime > daily[0].sunriseTime && modifiedCurrentTime < daily[0].sunsetTime) {
          setDayOrNight("day");
        } else {
          setDayOrNight("night");
        }
      })
  }, []);

  function degToCardinal(windBearing) {
    const cardinalDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    let value = Math.floor((windBearing / 22.5) + 0.5);
    return cardinalDirections[(value % 16)];
  };

  return (
    // <WeatherProvider>
    <div className="app"
      style={{
        color: `${dayOrNight === "night" ? (
          "whitesmoke") : ("black")
          }`
      }}
    >
      {dayOrNight ? (
        <Background
          dayOrNight={dayOrNight}
        />
      ) : (
          ""
        )
      }
      <Container
        gridArea={"header"}
      >
        <p>Welcome to Rain or Shine!</p>
        <label htmlFor="switch">Toggle</label>
        <input type="checkbox" id="switch"
          onClick={() => { isMetric ? setIsMetric(false) : setIsMetric(true) }}
        />
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
              gridArea={"details"}
            >
              <WeatherDetail
                weatherCondition={isMetric ? "Temperature(C)" : "Temperature(F)"}
                weatherInfo={isMetric ? (
                  ((currentWeather.temperature - 32) * 5 / 9).toString().slice(0, 5)
                ) : (
                    currentWeather.temperature)}
              />
              <WeatherDetail
                weatherCondition={"Humidity"}
                weatherInfo={currentWeather.humidity}
              />
              <WeatherDetail
                weatherCondition={"Chance of Precipitation"}
                weatherInfo={`${currentWeather.precipProbability}%`}
              />
              <span></span>
              <WeatherIcon
                icon={currentWeather.icon}
                dayOrNight={dayOrNight}
                size={window.innerWidth < 550 ? "128" : "256"}
                gridArea={"weatherDetail"}
              />
              <span></span>
              <WeatherDetail
                weatherCondition={isMetric ? "Wind Speed(kph)" : "Wind Speed(mph)"}
                weatherInfo={
                  isMetric ? (
                    (currentWeather.windSpeed * 1.60934).toString().slice(0, 4)
                  ) : (
                    currentWeather.windSpeed)}
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
          </Tilt>
        </>
      ) : (
          <div className="loadingContent">
            <p>Retrieving Weather</p>
            <Icon type="loading" />
          </div>
        )}
      <Container
        gridArea={"weatherPlot"}
      >
        <ForecastPlot
          forecast={dailyWeather}
        />
      </Container>
    </div>
    // </WeatherProvider>
  );
}

export default App;
