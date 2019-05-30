import React, { useState, useEffect } from 'react';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetail from "./components/WeatherDetail";
import API from "./utils/API";
import './App.scss';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    API.getWeather()
      .then(res => setCurrentWeather(res.data.currently))
  }, []);

  console.log(currentWeather)

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
