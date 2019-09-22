"use strict";

import api from "./api.js";
import apiComment from "./api-comments.js";

const { getBeer, postBeerLike } = api();
const { postBeerComment } = apiComment();

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




export const goToBottom = (htmlElement) => {
  htmlElement.addEventListener("click", () => window.scrollTo(0,document.body.scrollHeight));
};


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



export const addBeerComment = (htmlElement) =>{
  const comment = htmlElement;
  const commentButton = comment.querySelector("#comment-form button");
  const commentList = document.querySelector("#commentList .collection");
  const beerId = commentButton.dataset.id;
  const commentLoader = comment.querySelector(".comment-loader");
  
  console.log(commentButton);
  console.log(commentLoader);
  console.log(commentList);
  
  commentButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const commentInput = comment.querySelector("input");
      let commentInputValue = commentInput.value;
      commentInput.value = "";
      console.log(commentInputValue);
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




export const toggleLIContent = (htmlElement) => {
  htmlElement.addEventListener("click", toggle(htmlElement, "active"));
}; 






