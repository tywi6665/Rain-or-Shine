import React, { useState, useEffect } from 'react';
import useGeolocation from "./hooks/useGeolocation";
import Background from './components/Background/Background';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetail from "./components/WeatherDetail";
import Tilt from "./components/Tilt";
import ForecastPlot from "./components/ForecastPlot";
import { Icon } from 'antd';
import API from "./utils/API";
import './App.scss';

function App() {

  const state = useGeolocation();

  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [dayOrNight, setDayOrNight] = useState("");
  const [isMetric, setIsMetric] = useState(false);
  const [location, setLocation] = useState("Current Location");
  const [geolocation, setGeolocation] = useState({ lat: null, lng: null })
  // const [geolocation, setGeolocation] = useState({ lat: "39.7392", lng: "-104.9903" })
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!geolocation.lat) {
      setGeolocation({ lat: state.lat, lng: state.lng });
      setLocation(state.location);
      // alert("The search feature of this application requires access to your browsers geolocation. Please enable.")
    }
    if (geolocation.lat) {
      API.getWeather(geolocation)
        .then(res => {
          let currently = res.data.currently;
          let daily = res.data.daily.data;
          currently.icon = currently.icon.replace(/-/g, "").replace("day", "").replace("night", "");
          setDailyWeather(daily);
          setCurrentWeather(currently);
          let modifiedCurrentTime = Number(Date.now().toString().slice(0, 10));
          if (modifiedCurrentTime > daily[0].sunriseTime && modifiedCurrentTime < daily[0].sunsetTime) {
            setDayOrNight("day");
          } else {
            setDayOrNight("night");
          }
        })
    }
  }, [geolocation, state.lat, state.lng]);

  function degToCardinal(windBearing) {
    const cardinalDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    let value = Math.floor((windBearing / 22.5) + 0.5);
    return cardinalDirections[(value % 16)];
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    API.getGeocode(location)
      .then(res => {
        console.log(res)
        setGeolocation(res.data.results[0].geometry.location);
      })
  }

  return (
    <div className="app"
      style={{
        color: `${dayOrNight === "night" ? (
          "whitesmoke") : ("black")
          }`
      }}
    >
      <form
        className="enterLocation"
        onSubmit={handleFormSubmit}
      >
        <Icon className="searchIcon" type="search" />
        <input type="search"
          placeholder={location}
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
        </input>
      </form>
      <div className="unitToggle">
        <input type="checkbox" id="switch"
          onChange={() => { isMetric ? setIsMetric(false) : setIsMetric(true) }}
        />
        <label htmlFor="switch"></label>
      </div>
      {dayOrNight ? (
        <Background
          dayOrNight={dayOrNight}
          currentWeather={currentWeather.icon}
          key={currentWeather.icon}
        />
      ) : (
          ""
        )
      }
      <Container
        gridArea={"header"}
      >
        <p className="title">Welcome to
          <span className="titleRain">Rain
            <i className="titleRainDrops"></i>
            <i className="titleRainDrops"></i>
            <i className="titleRainDrops"></i>
            <i className="titleRainDrops"></i>
            <i className="titleRainDrops"></i>
          </span>
          or
          <span className="titleShine">Shine!</span>
        </p>
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
              >
                <div className="thermometer"></div>
              </WeatherDetail>
              <WeatherDetail
                weatherCondition={"Humidity"}
                weatherInfo={`${Math.ceil(currentWeather.humidity * 100)}%`}
              />
              <WeatherDetail
                weatherCondition={"Chance of Precipitation"}
                weatherInfo={`${Math.ceil(dailyWeather[0].precipProbability * 100)}%`}
              >
                <div className="raindrop"></div>
              </WeatherDetail>
              <span></span>
              <WeatherIcon
                icon={currentWeather.icon}
                dayOrNight={dayOrNight}
                size={windowWidth < 550 ? "128" : "256"}
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
                weatherInfo={degToCardinal(currentWeather.windBearing)}
              >
                <Icon
                  className="arrowIcon"
                  type="arrow-up"
                  style={{ transform: `rotate(${currentWeather.windBearing}deg)`, fontSize: "20px" }}
                />
              </WeatherDetail>
              <WeatherDetail
                weatherCondition={"UV Index"}
                translate={true}
                weatherInfo={currentWeather.uvIndex}
              >
                <div className="uvScale"></div>
              </WeatherDetail>
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
          windowWidth={windowWidth}
          isMetric={isMetric}
        />
      </Container>
      <Container
        gridArea={"footer"}
      >
        <p>Powered by Dark Sky</p>
        <p>Made by tywi6665</p>
        <a href="https://github.com/tywi6665"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="github" />
        </a>
      </Container>
    </div>
  );
}

export default App;
