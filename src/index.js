let today = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekday = document.querySelector("#weekday");
weekday.innerHTML = weekdays[today.getDay()];

let hour = document.querySelector("#hour");
hour.innerHTML = today.getHours();

let minutes = document.querySelector("#minutes");
minutes = today.getMinutes();

function refreshWeather(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML =
    Math.round(response.data.temperature.current * 10) / 10;

  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = response.data.temperature.humidity;

  let wind = document.querySelector("#wind-value");
  wind.innerHTML = response.data.wind.speed;

  let weatherDescription = document.querySelector("#weather");
  weatherDescription.innerHTML = response.data.condition.description;

  let weatherIcon = document.querySelector("#icon");
  let iconURL = response.data.condition.icon_url;
  weatherIcon.src = iconURL;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[date.getDay()];
}

function getForecast(response) {
  console.log(response.data);

  let days = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = "";

  days.forEach(function (days, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
          <div class="col">
            <div class="forecast-date">${formatDate(days.time)}</div>
            <div class="forecast-condition">${days.condition.description}</div>
            <img
              class="forecast-image"
              src='${days.condition.icon_url}'
            />
            <div class="forecast-temperature">
              <span class="max-temperature">${Math.round(
                days.temperature.maximum
              )}°</span>
              <span class="min-temperature">${Math.round(
                days.temperature.minimum
              )}°</span>
            </div>
          </div>
        </div>`;
    }
  });

  forecast.innerHTML = forecastHTML;
}

function searchCity(city) {
  let APIKey = "e30450tcao35053d2a305f02341b3b2d";
  let APIURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${APIKey}`;
  let forecastAPI = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${APIKey}`;
  axios.get(APIURL).then(refreshWeather);
  axios.get(forecastAPI).then(getForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  searchCity(input.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Caracas");
