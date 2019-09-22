"use strict";

import api from "./api.js";
import apiComment from "./api-comments.js";

const { getBeer, postBeerLike } = api();
const { postBeerComment } = apiComment();


// COMMON UTILS

/**
 * toggle class
 * @param {any} htmlElement Dom element
 * @param {string} className css class
 */
export const toggle = (htmlElement, className) => () => {
  htmlElement.classList.toggle(className);
};

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
 * Remove class from HTML Element
 * @param {any} htmlElement HTML Element
 * @param {string} className css class name
 */
export const removeClass = (htmlElement, className) => () => {
  htmlElement.classList.remove(className);
};

/**
 * Add class to a HTML Element
 * @param {any} htmlElement HTML Element
 * @param {string} className css class name
 */
export const addClass = (htmlElement, className) => () => {
  htmlElement.classList.add(className);
};

/**
 * Set beer like in local storage
 * @param {string} id id to set in local storage
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
 * Load cheked likes from local storage
 * @param {string} id id to check likes
 * @param {any} htmlElement DOM element
 */
export const loadChekedLikes = (htmlElement, id) => {
  const getBeerLikeStatus = localStorage.getItem("beerId-" + id);
  if (JSON.parse(getBeerLikeStatus)) {
    htmlElement.classList.add("liked");
  }
};

/**
 * Clear innerHTML of Element
 * @param {any} htmlElement HTML Element
 */
export const clearDOM = (htmlElement) => () => {
  htmlElement.innerHTML = "";
};

/**
 * Send the scroll to the bottom of the page
 * @param {any} htmlElement HTML Element
 */
export const goToBottom = (htmlElement) => {
  htmlElement.addEventListener("click", () => window.scrollTo(0,document.body.scrollHeight));
};

/**
 * Add beer like to element
 * @param {any} htmlElement HTML Element
 */
export const addBeerLike = (htmlElement) =>{
  const card = htmlElement;
  const likeButton = card.querySelector(".like");
  const likeCount = card.querySelector(".like-count");
  const beerId = likeButton.dataset.id;
  const likeLoader = card.querySelector(".like-loader");
  
  likeButton.addEventListener("click", async () => {
    if (!likeButton.classList.contains("liked")) {
      try {
        toggle(likeLoader, "hide")();
        toggle(likeButton, "disabled")();
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
        toggle(likeButton, "disabled")();
      }
    }  
  });
};


/**
 * Add beer comment to detail view
 * @param {any} htmlElement HTML Element
 */
export const addBeerComment = (htmlElement) =>{
  const comment = htmlElement;
  const commentButton = comment.querySelector("#comment-form button");
  const commentList = document.querySelector("#commentList .collection");
  const beerId = commentButton.dataset.id;
  const commentLoader = comment.querySelector(".comment-loader");
  
  commentButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const commentInput = comment.querySelector("input");
      let commentInputValue = commentInput.value;
      commentInput.value = "";
      toggle(commentLoader, "hide")();
      toggle(commentButton, "disabled")();
      await postBeerComment(beerId, commentInputValue).then(async () => {
        await getBeer(beerId).then((beer) => {
          commentList.innerHTML = `
          ${beer.comment.map(comment =>`
            <li class="collection-item">
              <div class="date">${new Date(comment.dateComment).getUTCMonth()+1}/${new Date(comment.dateComment).getUTCFullYear()}</div> 
              <div>${comment.comment}</div>
            </li>
          `).join("")}
          `;
        });
      });
    } catch (err) {
      console.error(err);
        
    } finally {
      toggle(commentLoader, "hide")();
      toggle(commentButton, "disabled")();
    }
  });
};

/**
 * Add active class to collapsible
 * @param {any} htmlElement HTML Element
 */
export const toggleLIContent = (htmlElement) => {
  htmlElement.addEventListener("click", toggle(htmlElement, "active"));
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





