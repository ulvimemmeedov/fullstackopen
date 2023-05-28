import axios from 'axios';

import { useEffect, useState } from 'react';

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
          lat: country.capitalInfo.latlng[0],
          lon: country.capitalInfo.latlng[1],
          units: 'metric',
        },
      })
      .then((res) => setWeather(res.data));
  }, [country.capitalInfo.latlng]);

  if (weather.length === 0) return null;

  return (
    <>
      <h3>Weather in {country.capital}</h3>
      <img
        alt={weather.weather[0].description}
        title={weather.weather[0].description}
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <div>
        Temperature <b>{weather.main.temp} °C</b>
      </div>
      <div>
        Wind <b>{weather.wind.speed} m/s</b>
      </div>
    </>
  );
};

export default CountryWeather;
