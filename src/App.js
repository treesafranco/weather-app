import React, { Component } from "react";

import WeatherInfo from './Container/WeatherInfo';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">Snaphunt Technical Test</div>
        <div className="app-body">
            <WeatherInfo />
        </div>
      </div>
    );
  }
}

export default App;