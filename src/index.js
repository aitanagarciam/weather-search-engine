function handleSearch(event) {
  event.preventDefault();
  let h1 = document.querySelector("#city");
  let input = document.querySelector("#search-input");
  h1.innerHTML = input.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
