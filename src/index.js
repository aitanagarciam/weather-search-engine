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

searchCity("Caracas");

function refreshWeather(response) {
  console.log(response.data);
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

function getForecast(response) {
  console.log(response.data);

  let days = response.data.daily;

  let forecast = document.querySelector("#forecast");

  //let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = "";

  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
          <div class="col">
            <div class="forecast-date">${days.condition.description}</div>
            <img
              class="forecast-image"
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
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
  getForecast(input.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

/*
function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = "";

  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
          <div class="col">
            <div class="forecast-date">${days}</div>
            <img
              class="forecast-image"
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
            />
            <div class="forecast-temperature">
              <span class="max-temperature">29°</span>
              <span class="min-temperature">24°</span>
            </div>
          </div>
        </div>`;
  });

  forecast.innerHTML = forecastHTML;
}

displayForecast();
*/
