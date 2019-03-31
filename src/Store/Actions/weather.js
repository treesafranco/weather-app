import * as actionTypes from "./actionTypes";
import axios from 'axios';

const formatData = result => {
  const data = {
    icon: result.currently.icon,
    description: result.currently.summary,
    wind: result.currently.windSpeed,
    humidity: result.currently.humidity,
    temp: result.currently.temperature,
    dewPoint: result.currently.dewPoint
  };
  return data;
};

// Fetch Weather Info
const fetchWeatherInfo_success = data => {
  return {
    type: actionTypes.FETCH_WEATHER_INFO_SUCCESS,
    data: data
  };
};


export const fetchWeatherInfo = country => {
  return dispatch =>
    axios.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/28b62d0997403c765e31d5fc29398233/" +
        country.latitude + "," + country.longitude + "?units=si&exclude=hourly,minutely,daily,alerts,flags")
      .then(response => {
        const data = formatData(response.data);
        data["name"] = country.name;
        dispatch(fetchWeatherInfo_success(data));
      })
      .catch((error) => {
            console.log(error);
        }
    );
};

//Loading
const refresh = () => {
  return {
    type: actionTypes.REFRESH_WEATHER_START,
    loading: true
  };
};

export const loadRefreshScreen = () => {
  return dispatch => dispatch(refresh());
};

// Refresh WeatherInfo
const refreshWeatherInfo_success = (countryId, data) => {
  return {
    type: actionTypes.REFRESH_WEATHER_INFO_SUCCESS,
    data: data,
    id: countryId
  };
};

export const refreshWeatherInfo = (country, countryId) => {
  return dispatch =>
    axios.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/28b62d0997403c765e31d5fc29398233/" +
        country.latitude + "," + country.longitude +
        "?units=si&exclude=hourly,minutely,daily,alerts,flags")
      .then(response => {
        const data = formatData(response.data);
        data["name"] = country.name;
        setTimeout( ()=>{ dispatch(refreshWeatherInfo_success(countryId, data));}, 100); //display refresh screen for 100ms
      })
      .catch((error) => {
        console.log(error);
      });
};
