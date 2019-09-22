import  page  from "../../node_modules/page/page.mjs";
import { loadBeers } from "./beers.js";

page("/", () => {
  console.log("Home page");
  loadBeers();
});
// eslint-disable-next-line no-unused-vars
page("/detail/:id", ctx => {
  console.log("Detail");
});
page();