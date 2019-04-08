import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "../Components/Slider";
import WeatherCard from "../Components/WeatherCard";
import Spinner from "../Components/Spinner";
import { fetchWeatherInfo, refreshWeatherInfo }  from "../Store/Actions/weatherInfo";
import * as constants from '../Store/Actions/constants';

class WeatherInfo extends Component {

  componentDidMount() {
    this.props.onInitApp(constants.COUNTRIES);
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
