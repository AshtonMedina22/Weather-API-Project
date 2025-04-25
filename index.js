function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector(".current-details");
    let iconElement = document.querySelector(".current-temperature-icon");
  
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = `
      ${formatDate(new Date())}, ${response.data.condition.description}<br />
      Humidity: <strong>${response.data.temperature.humidity}%</strong>, Wind: <strong>${Math.round(response.data.wind.speed)}km/h</strong>
    `;
    iconElement.innerHTML = getWeatherEmoji(response.data.condition.icon);
  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "df0784t786f3bo13067efba6f53aff47";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  function getWeatherEmoji(condition) {
    const weatherIcons = {
      "clear-sky-day": "☀️",
      "clear-sky-night": "🌙",
      "few-clouds-day": "⛅",
      "few-clouds-night": "☁️",
      "scattered-clouds-day": "☁️",
      "scattered-clouds-night": "☁️",
      "broken-clouds-day": "☁️",
      "broken-clouds-night": "☁️",
      "shower-rain-day": "🌧️",
      "shower-rain-night": "🌧️",
      "rain-day": "🌦️",
      "rain-night": "🌧️",
      "thunderstorm-day": "⛈️",
      "thunderstorm-night": "⛈️",
      "snow-day": "🌨️",
      "snow-night": "🌨️",
      "mist-day": "🌫️",
      "mist-night": "🌫️"
    };
    return weatherIcons[condition] || "☀️";
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);
  
  // Load Dallas weather by default
  function searchDallas() {
    let apiKey = "df0784t786f3bo13067efba6f53aff47";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Dallas&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
  document.addEventListener("DOMContentLoaded", searchDallas);
    