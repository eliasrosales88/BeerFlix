// import { renderDOMShows } from "./shows.js";
import storage from "./storage.js";
import { loadBeers } from "./beers.js";

const { setItem, getItem } = storage("cookieStorage");

const searchForm = 
  document.querySelector("#search-form");
const searchInput =
  document.querySelector("#search-beer");

searchInput.value = getItem("search");

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(searchForm.checkValidity());
  console.log(searchInput.validity);
  console.log(searchInput.dataset.patternMismatch);
  if (searchInput.validity.valid) {
    setItem("search", searchInput.value);
    loadBeers(searchInput.value);
  }
});