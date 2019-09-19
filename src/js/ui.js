"use strict";
console.log("UI Loaded");

/**
 * onHover class on hover
 * @param {*} htmlElement Dom element
 * @param {*} className css class
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
 * @param {*} htmlElement Dom element
 * @param {*} className css class
 */
export const toggle = (htmlElement, className) => {
  htmlElement.classList.toggle(className);
};



