import React from 'react';
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import './App.scss';

function App() {
  return (
    <div className="App">
      <Container>
        <p>Gotta start somewhere!!!</p>
      </Container>
      <Container>
        <WeatherIcon
          icon={"chanceflurries"}
        />
      </Container>
    </div>
  );
}

export default App;
