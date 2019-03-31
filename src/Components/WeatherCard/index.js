import React from 'react';

import LogoImage from '../../assets/images/logo.png';
import RefreshImage from '../../assets/images/refresh.png';


const weatherCard = (props) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
  
    return (
      <div className="card weather">
        <div className="header">
          <div id="card_nav" className="nav">
            <img className="logo" src={LogoImage} alt="logo" />
            <div
              className="refresh"
              onClick={e => props.onRefresh(e, props.data.name, props.id)}>
              <img src={RefreshImage} alt="refresh" />
            </div>
          </div>
          <div className="icon">
            <i className={`wi wi-forecast-io-${props.data.icon}`} />
          </div>
        </div>
        <div className={`content ${props.color}`}>
          <div className="temp">
            <span>{Math.floor(props.data.temp)}</span>
          </div>
          <div className="info">
            <span>{props.data.description}</span>
            <span>{props.data.name}</span>
          </div>
          <div className="date">
            <span>{month}</span>
            <span>{day}</span>
          </div>
        </div>
        <div className="footer">
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
      </div>
    );
  };
  
  export default weatherCard;
