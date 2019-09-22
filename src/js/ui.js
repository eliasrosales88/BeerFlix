"use strict";

/**
 * onHover class on hover
 * @param {any} htmlElement Dom element
 * @param {string} className css class
 */
export const onHover = (htmlElement, className) => {
  
  htmlElement.addEventListener("mouseenter", () => {
    htmlElement.classList.toggle(className);
  });
  htmlElement.addEventListener("mouseleave", () => {
    htmlElement.classList.toggle(className);
  });
};



/**
 * toggle class
 * @param {any} htmlElement Dom element
 * @param {string} className css class
 */
export const toggle = (htmlElement, className) => () => {
  htmlElement.classList.toggle(className);
};


export const removeClass = (htmlElement, className) => () => {
  htmlElement.classList.remove(className);
};

export const addClass = (htmlElement, className) => () => {
  htmlElement.classList.add(className);
};

/**
 * 
 * @param {string} id Set beer like in localstorage
 * @param {any} htmlElement DOM element
 */
export const onLike = async (htmlElement, id) => {
  const getBeerLikeStatus = localStorage.getItem("beerId-" + id);
  if (getBeerLikeStatus === null) {
    localStorage.setItem("beerId-" + id, "true");
    htmlElement.classList.add("liked");
  }
};

/**
 * 
 * @param {string} id load cheked likes from localstorage
 * @param {any} htmlElement DOM element
 */
export const loadChekedLikes = (htmlElement, id) => {
  const getBeerLikeStatus = localStorage.getItem("beerId-" + id);
  
  if (JSON.parse(getBeerLikeStatus)) {
    htmlElement.classList.add("liked");
  }
};


export const clearDOM = (htmlElement) => () => {
  htmlElement.innerHTML = "";
};



const loader = document.querySelector("#loader");
const search = document.querySelector("#search-form");
const headerImg = document.querySelector("#header-img");
const container = document.querySelector("#main-beers");
const arrowBack = document.querySelector("#arrow-back");


export const toggleLoader = toggle(loader, "hide");
export const toggleSearch = toggle(search, "hide");

export const hideHeaderImg = addClass(headerImg, "hide");
export const showHeaderImg = removeClass(headerImg, "hide");

export const hideArrowBack = addClass(arrowBack, "hide");
export const showArrowBack = removeClass(arrowBack, "hide");


export const clearSection = clearDOM(container);






