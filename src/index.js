function refreshWeather(response) {
  console.log(response.data);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;
  //console.log(response.data.temperature.current);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = response.data.temperature.current;
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let APIKey = "e30450tcao35053d2a305f02341b3b2d";
  let APIURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${APIKey}`;
  axios.get(APIURL).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  searchCity(input.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
