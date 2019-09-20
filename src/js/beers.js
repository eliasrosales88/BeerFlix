"use strict";
import  api from "./api.js";
import { toggle, onLike, loadChekedLikes, toggleLoader } from "./ui.js";

const { getBeers, getBeer, postBeerLike } = api();
const mainSection = document.querySelector("#main-beers");

// const {} = 

const cardTemplate = ({ beerId, name, description, image, likes, firstBrewed}) => `
  <div class="col s12 m6 l4">
    <div class="card hoverable">
      <div class="card-image">
        <img class="activator beer-thumb" src="${image}">
        <span class="btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons right grey-text text-darken-4">more_vert</i></span>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${name}</span>
        <div class="row">
          <div class="col s9">
            <p><a href="#">Full Review</a></p>
          </div>
          <div class="col s3">
            <div class="right-align d-flex flex-column flex-ai-end"><span><i class="material-icons like" data-id=${beerId}>thumb_up_alt</i></span><span class="like-count"> ${likes}</span></div>
          </div>
        </div>
      </div>
      <div class="like-loader hide">
        <div class="progress">
          <div class="indeterminate green darken-4"></div>
        </div>
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
    const likeButton = card.querySelector(".like");
    const likeCount = card.querySelector(".like-count");
    const beerId = likeButton.dataset.id;
    const likeLoader = card.querySelector(".like-loader");


    descButton.addEventListener("click", toggle(desc, "reveal"));
    closeDesc.addEventListener("click", toggle(desc, "reveal"));
    likeButton.addEventListener("click", async () => {
      if (!likeButton.classList.contains("liked")) {
        try {
          toggle(likeLoader, "hide")();
          await postBeerLike(beerId).then(async () => {
            await getBeer(beerId).then((beer) => {
              likeCount.innerHTML = beer.likes;
              onLike(likeButton, beerId);
            });
          });
        } catch (err) {
          console.error(err);
          
        } finally {
          toggle(likeLoader, "hide")();
        }
      }  
      
      
    
    });
    
    loadChekedLikes(likeButton , beerId);
    
    
  });
};



/**
 * Load beers and asign them in the DOM
 */
const loadBeers = async () => {
  try {
    toggleLoader();
    
    const beers = await getBeers();
    renderBeers(mainSection, beers);

  } catch (err) {
    console.log(err);
  } finally {

    toggleLoader();
  } 
 
};

loadBeers();