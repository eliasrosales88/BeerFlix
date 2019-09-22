import api from "./api.js";
import { toggleLoader } from "./ui.js";
// import { renderQuotes } from './quotes.js';

const { getBeer } = api();

const detailTemplate = ({ beerId, name, description, image, likes, firstBrewed, price}) => `
  <div class="col s12">
    <div class="card hoverable">
      <div class="card-image">
        <span class="price"><span class="price-label">price</span>${price}$</span>
        <img class="activator beer-thumb" src="${image}">
        <span class="btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons right grey-text text-darken-4">more_vert</i></span>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${name}</span>
        <div class="row">
          <div class="col s9">
            <p>first brewed: <b>${firstBrewed}</b></p>
            <p><a href="/detail/${beerId}">Full Review</a></p>
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
        <p>Price: <b>${price}$</b></p>
        <p>First brewed: <b>${firstBrewed}</b></p>
        <p>${description}</p>
        <p><a href="#">Full Review</a></p>
      </div>
    </div>
  </div>
`;

const renderDetail = async id => {
  try {
    toggleLoader();
    const container = document.querySelector("#main-beers");
    const [beer] = await Promise.all([getBeer(id)]);
    // const [show] = await Promise.all([getShowDetail(id), renderQuotes(id)]);
    // const show = await getShowDetail(id);
    // await renderQuotes(id);
    container.innerHTML = detailTemplate(beer);
  } catch (err) {
    console.error(err);
  } finally {
    toggleLoader();
  }
};

export default renderDetail;
