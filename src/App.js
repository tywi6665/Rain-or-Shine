import React from 'react';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetail from "./components/WeatherDetail";
import './App.scss';

function App() {
  console.log(process.env.REACT_APP_DARK_SKY_KEY)
  return (
    <div className="App">
      <Container>
        <p>Welcome to Rain or Shine!</p>
      </Container>
      <Container>
        <WeatherIcon
          icon={"chanceflurries"}
        />
      </Container>
      <Container>
        <WeatherDetail
          weatherCondition={"Chance of rain"}
          weatherInfo={"90%"}
        />
        <WeatherDetail
          weatherCondition={"Wind Speed"}
          weatherInfo={"25mph"}
        />
        <WeatherDetail
          weatherCondition={"Wind Direction"}
          weatherInfo={"NNW"}
        />
      </Container>
    </div>
  );
}

export default App;
