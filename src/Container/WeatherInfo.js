import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "../Components/Slider";
import WeatherCard from "../Components/WeatherCard";
import Spinner from "../Components/Spinner";
import { fetchWeatherInfo, refreshWeatherInfo }  from "../Store/Actions/weatherInfo";

export const COUNTRIES = [
  {
    name: "singapore",
    latitude: "1.3521",
    longitude: "103.8198"
  },
  {
    name: "india",
    latitude: "20.5937",
    longitude: "78.9629"
  },
  {
    name: "canada",
    latitude: "43.6532",
    longitude: "-79.3832"
  }
];

class WeatherInfo extends Component {

  componentDidMount() {
    for (let i = 0; i < COUNTRIES.length; i++) {
      this.props.onInitApp(COUNTRIES[i]);
    }
  }

  render() {
    return (
      <div className="weatherInfo-container">
        <div className="weatherInfo-slider-container">
          <Slider>
            {this.props.weather && this.props.weather.length > 0 ? (
              this.props.weather.map((item, index) => {
                return (
                  <WeatherCard
                    key={index}
                    id={index}
                    data={item}
                    onRefresh={countryId => this.props.onCardRefresh(this.props.weather[countryId], countryId)}
                    isLoading={this.props.loading}/>
                );
              })
            ) :  <Spinner />}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitApp: country => dispatch(fetchWeatherInfo(country)),
    onCardRefresh: (country, countryId) => dispatch(refreshWeatherInfo(country, countryId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
