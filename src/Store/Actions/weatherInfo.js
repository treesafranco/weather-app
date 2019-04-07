import axios from 'axios';
import { COUNTRIES } from '../../Container/WeatherInfo';

export const FETCH_WEATHER_INFO_SUCCESS = "FETCH_WEATHER_INFO_SUCCESS";
export const FETCH_WEATHER_INFO_FAIL= "FETCH_WEATHER_INFO_FAIL";
export const REFRESH_WEATHER_INFO_SUCCESS = "REFRESH_WEATHER_INFO_SUCCESS";
export const REFRESH_WEATHER_INFO_FAIL = "REFRESH_WEATHER_INFO_FAIL";
export const REFRESH_WEATHER_START = "REFRESH_WEATHER_START";

const formatData = (result, country) => {
  const data = {
    name: country.name,
    longitude: country.longitude,
    latitude: country.latitude,
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
const fetchWeatherInfoSuccess = data => {
  return {
    type: FETCH_WEATHER_INFO_SUCCESS,
    data: data
  };
};

const fetchWeatherInfoFail = (error) => {
  return {
    type: FETCH_WEATHER_INFO_FAIL,
    error: error
  };
};

export const fetchWeatherInfo = country => {
  return dispatch => {
      axios.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/28b62d0997403c765e31d5fc29398233/" +
      country.latitude + "," + country.longitude + "?units=si&exclude=hourly,minutely,daily,alerts,flags")
    .then(response => {
      const data = formatData(response.data, country);
      dispatch(fetchWeatherInfoSuccess(data));
    })
    .catch((error) => {
        dispatch(fetchWeatherInfoFail(error.message));
      });
    }
};

// Refresh WeatherInfo
const refreshStart = () => {
  return {
    type: REFRESH_WEATHER_START,
    loading: true
  };
};

const refreshWeatherInfoSuccess = (countryId, data) => {
  return {
    type: REFRESH_WEATHER_INFO_SUCCESS,
    data: data,
    id: countryId
  };
};

const refreshWeatherInfoFail = (error) => {
  return {
    type: REFRESH_WEATHER_INFO_FAIL,
    error: error
  };
};

export const refreshWeatherInfo = (country, countryId) => {
  return dispatch => {
    dispatch(refreshStart());
    axios.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/28b62d0997403c765e31d5fc29398233/" +
        country.latitude + "," + country.longitude +
        "?units=si&exclude=hourly,minutely,daily,alerts,flags")
      .then(response => {
        const data = formatData(response.data, country);
        setTimeout( ()=>{ dispatch(refreshWeatherInfoSuccess(countryId, data));}, 100); //display refresh screen for 100ms
      })
      .catch((error) => {
        dispatch(refreshWeatherInfoFail(error.message));
      });
    }
};
