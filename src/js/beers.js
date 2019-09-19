"use strict";
import  api from "./api.js";
import { toggle } from "./ui.js";

const { getBeers } = api();
const mainSection = document.querySelector("#main-beers");

// const {} = 

const cardTemplate = ({ name, description, image, likes, firstBrewed}) => `
  <div class="col s12 m6 l4">
    <div class="card hoverable">
      <div class="card-image">
        <img class="activator beer-thumb" src="${image}">
        <span class="btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons right grey-text text-darken-4">more_vert</i></span>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${name}</span>
        <p><a href="#">Full Review</a></p>
        <p><i class="material-icons grey-text text-darken-4">thumb_up_alt</i> ${likes}</p>
      </div>
      <div class="card-reveal amber lighten-2">
        <div class="card-close right"><i class="material-icons">close</i></div>
        <div class="card-title grey-text text-darken-4">${name}</div>
        <p>first brewed: <b>${firstBrewed}</b></p>
        <p>${description}</p>
        <p><a href="#">Full Review</a></p>
      </div>
    </div>
  </div>
`;


/**
 * 
 * @param {any} elementToInjectBeersDOM place where the beers will be injected
 * @param {any} beers beers array
 */
const renderBeers = (elementToInjectBeersDOM, beers) => {
  // Here is asigned the beer with the card template
  const htmlBeer = beers.slice(0, 10).map(beer => {
    return cardTemplate({ ...beer});
  }).join("");

  elementToInjectBeersDOM.innerHTML = htmlBeer;
  
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    const descButton = card.querySelector("span.btn-floating");
    const desc = card.querySelector(".card-reveal");
    const closeDesc = card.querySelector(".card-close");
    
    descButton.addEventListener("click", () => toggle(desc, "reveal"));
    closeDesc.addEventListener("click", () => toggle(desc, "reveal"));
    
    
    
  });
};



/**
 * Load beers and asign them in the DOM
 */
const loadBeers = async () => {
  try {
    const beers = await getBeers();

    renderBeers(mainSection, beers);

  } catch (err) {
    console.log(err);
  }
  // // eslint-disable-next-line no-unused-vars
  // beers.forEach(bear => {
  //   mainSection.innerHTML += cardTemplate;
  // });
};

loadBeers();