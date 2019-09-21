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

  let isDate = false;
  const dateStartInput = document.querySelector("#start-date");
  const dateEndInput = document.querySelector("#end-date");
  
  const dateStartYear = new Date(dateStartInput.value).getUTCFullYear();
  const dateEndYear = new Date(dateEndInput.value).getUTCFullYear();
  const dateStartMonth = new Date(dateStartInput.value).getUTCMonth();
  const dateEndMonth = new Date(dateEndInput.value).getUTCMonth();

  
  if ( searchInput.validity.valid && !isNaN(dateStartYear) && !isNaN(dateStartMonth) && !isNaN(dateEndYear) && !isNaN(dateEndMonth) ) {
    isDate = true;
    setItem("search", searchInput.value);
    loadBeers(searchInput.value, isDate, dateStartMonth, dateStartYear, dateEndMonth, dateEndYear);

  }else {
    
    if (searchInput.validity.valid) {
      isDate = false;
      setItem("search", searchInput.value);
      loadBeers(searchInput.value, isDate);
    }
  } 
});