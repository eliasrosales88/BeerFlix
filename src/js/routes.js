import  page  from "../../node_modules/page/page.mjs";
import { loadBeers } from "./beers.js";
import renderDetail from "./detail.js";
import {  hideHeaderImg, showHeaderImg, clearSection, hideArrowBack, showArrowBack } from "./ui.js";

page("/", () => {
  console.log("Home page");
  hideArrowBack();
  clearSection();
  loadBeers();
  showHeaderImg();

});
// eslint-disable-next-line no-unused-vars
page("/detail/:id", ctx => {
  console.log("Detail");
  showArrowBack();
  clearSection();
  const { params: { id } } = ctx;
  hideHeaderImg();
  renderDetail(id);
});
page();