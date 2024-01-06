function refreshWeather(response) {
  console.log(response.data);
}

function searchCity(city) {
  let APIKey = "e30450tcao35053d2a305f02341b3b2d";
  let APIURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${APIKey}`;
  axios.get(APIURL).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let h1 = document.querySelector("#city");
  let input = document.querySelector("#search-input");
  h1.innerHTML = input.value;
  searchCity(input.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
