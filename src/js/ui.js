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


const loader = document.querySelector("#loader");


export const toggleLoader = toggle(loader, "hide");




