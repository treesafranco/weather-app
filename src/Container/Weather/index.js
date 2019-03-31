import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "../../Components/Slider";
import WeatherCard from "../../Components/WeatherCard";
import * as actions from "../../Store/Actions/weather";

const COUNTRIES = [
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

class Weather extends Component {
  componentDidMount() {
    for (let i = 0; i < 3; i++) {
      this.props.onInitApp(COUNTRIES[i]);
    }
  }

  searchCountryByName = (prop, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === prop) {
        return array[i];
      }
    }
  };

  cardRefreshHandler = (e, countryName, countryId) => {
    this.props.onLoading();
    const country = this.searchCountryByName(countryName, COUNTRIES);
    this.props.onCardRefresh(country, countryId);
    e.stopPropagation();
  };

  getColorFromIconName = (iconName) => {
    let color;
    if (iconName.indexOf("cloudy") > -1) {
      color = "blue";
    } else if (iconName.indexOf("clear") > -1) {
      color = "green";
    } else {
      color = "red";
    }
    return color;
  }

  render() {
    let cards = "";
    if (this.props.weather && this.props.weather.length > 0) {
      cards = this.props.weather.map((item, index) => {
        const color = this.getColorFromIconName(item.icon);
        return (
          <WeatherCard
            key={index}
            id={index}
            color={color}
            data={item}
            onRefresh={this.cardRefreshHandler}
            xxx={this.xxx}
          />
        );
      });
    }

    return <Slider loading={this.props.loading}>{cards}</Slider>;
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
    onInitApp: country => dispatch(actions.fetchWeatherInfo(country)),
    onLoading: () => dispatch(actions.loadRefreshScreen()),
    onCardRefresh: (country, countryId) => dispatch(actions.refreshWeatherInfo(country, countryId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
