import React, { Component } from "react";
import "../src/assets/scss/style.scss";
import Weather from "./Container/Weather";
import Aux from "./hoc/Aux";

class App extends Component {
  render() {
    return (
      <Aux>
        <header className="master_header">Snaphunt Technical Test</header>
        <section className="main_content">
          <div className="slider_wrapper">
            <Weather />
          </div>
        </section>
      </Aux>
    );
  }
}

export default App;