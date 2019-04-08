import React from 'react';

import LogoImage from '../assets/images/logo.png';
import RefreshImage from '..//assets/images/refresh.png';
import Spinner from '../Components/Spinner';

const weatherCard = (props) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    let color;
    if (props.data.icon.indexOf("cloudy") > -1) {
      color = "blue";
    } else if (props.data.icon.indexOf("clear") > -1) {
      color = "green";
    } else {
      color = "red";
    }

    return (
      <div className="card weather-card">
        <div className="card-header">
          <div className="nav">
            <img className="logo" src={LogoImage} alt="logo" />
            <div
              className="refresh"
              onClick={() => props.onRefresh(props.id)}>
              <img src={RefreshImage} alt="refresh" />
            </div>
          </div>
          <div className="icon">
            <i className={`wi wi-forecast-io-${props.data.icon}`} />
          </div>
        </div>
        <div className={`card-content ${color}`}>
          <div className="temp">
            <span>{Math.floor(props.data.temp)}</span>
          </div>
          <div className="info">
            <span>{props.data.description}</span>
            <span>{props.data.name.split('/')[1]}</span>
          </div>
          <div className="date">
            <span>{month}</span>
            <span>{day}</span>
          </div>
        </div>
        <div className="card-footer">
          <ul>
            <li className="item">
              <i className="wi wi-strong-wind" />
              <span>{props.data.wind.toFixed(1)} MPH</span>
            </li>
            <li className="item">
              <i className="wi wi-raindrop" />
              <span>{Math.floor(props.data.humidity * 100, 2)}%</span>
            </li>
            <li className="item">
              <i className="wi wi-day-sunny" />
              <span>{Math.floor(props.data.dewPoint, 2)}%</span>
            </li>
          </ul>
        </div>
        {props.isLoading && <Spinner/>}
      </div>
    );
  };
  
  export default weatherCard;
 