import React, { useState } from "react";
import axios from "axios";

export default function Search(props) {
  let [city, getCity] = useState(null);
  let [weather, getWeather] = useState(null);

  function updateWeather(response) {
    let city = response.data.name;
    let temperature = response.data.main.temp;
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let windspeed = response.data.wind.speed;

    getWeather(
      <ul className="weatherDescription">
        <li>{city}</li>
        <li>{Math.round(temperature)}° F</li>
        <li>{description}</li>
        <li>{humidity}%</li>
        <li>{windspeed} MPH</li>
        <li>
          <img
            src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={"weather icon"}
          />
        </li>
      </ul>
    );
  }

  function searchCity(event) {
    getCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a89eb9a057b7d42b2048718c9361f4a&units=imperial`;
    axios.get(apiUrl).then(updateWeather);
  }
  return (
    <div className="submission">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Enter a city" onChange={searchCity} />
        <input type="submit" value="submit" />
      </form>
      {weather}
    </div>
  );
}