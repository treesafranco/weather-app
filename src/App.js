import React, { Component } from "react";

import WeatherInfo from './Container/WeatherInfo';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">Simple Weather App</div>
        <div className="app-body">
            <WeatherInfo />
        </div>
      </div>
    );
  }
}

export default App;