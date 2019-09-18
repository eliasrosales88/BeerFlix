"use strict";
import  api from "./api.js";

const { getBeers } = api();
const mainSection = document.querySelector("#main-beers");

// const {} = 

const cardTemplate = `
  <div class="col s12 m6 l4">
    <div class="card">
      <div class="card-image">
        <img src="./src/images/sample-1.jpg">
        <span class="card-title">Card Title</span>
        <a class="btn-floating halfway-fab waves-effect waves-light amber "><i class="material-icons grey-text text-darken-4">add</i></a>
      </div>
      <div class="card-content">
        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
      </div>
    </div>
  </div>
`;




const renderBeers = async () => {
  const beers = await getBeers();
  // eslint-disable-next-line no-unused-vars
  beers.forEach(bear => {
    mainSection.innerHTML += cardTemplate;
  });
};

renderBeers();