import api from "./api.js";
import { toggleLoader, addBeerLike, loadChekedLikes, toggleLIContent, addBeerComment, goToBottom } from "./ui.js";

const { getBeer } = api();

const detailTemplate = ({ beerId, name, contributedBy, description, 
  image, likes, firstBrewed, price, ingredients, brewersTips, comment }) => `
<div class="col s12 hide-on-med-and-up">
    <div class="card">
        <div class="card-image">
            <img class="activator beer-thumb" src="${image}">
        </div>
    </div>
</div>
<div class="col s12">
    <div id="card-detail" class="card horizontal">
        <div class="card-image hide-on-small-only">
            <img class="activator beer-thumb" src="${image}">
        </div>
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${name}</span>
                <div class="row">
                    <div class="col s12">
                        <p>Price: <b>${price}$</b></p>
                        <p>First brewed: <b>${firstBrewed}</b></p>
                        <p>Contributed by: <b>${contributedBy}</b></p>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <div class="row">
                    <div class="col s3">
                        <div class="right-align d-flex flex-column  flex-ai-end">
                            <span><i class="material-icons like" data-id=${beerId}>thumb_up_alt</i></span>
                            <span class="like-count"> ${likes}</span>
                        </div>
                    </div>
                    <div class="col s9">
                      <a id="add-comment-btn" class="waves-effect waves-light btn amber grey-text text-darken-4">ADD COMMENT</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="like-loader hide">
            <div class="progress">
                <div class="indeterminate green darken-4"></div>
            </div>
        </div>
    </div>
</div>

<div id="beer-description" class="row">
  <div class="col s12">
    <div class="card">
      <div class="card-content">
        <span class="card-title">Description</span>
          <div class="divider"></div>
          <p>${description}</p><br>
          <p><b>brewersTips: </b>${brewersTips}</p>
      </div>
      <div id="beer-ingredients" class="card-content">
        <span class="card-title">Ingredients</span>
          <div class="divider"></div>
          <p><b>Malt:</b></p>
          <ul class="collection">
          ${ingredients.malt.map((item) => `
            <li class="collection-item">
              ${item.name} <span>${item.amount.value}</span> <span>${item.amount.unit}</span>
            </li>
          `).join("")}
          </ul>
          <p><b>Hops:</b></p>
          <ul class="collection">
          ${ingredients.hops.map((item) => `
            <li class="collection-item">
              ${item.name} <span>${item.amount.value}</span> <span>${item.amount.unit}</span>
            </li>
          `).join("")}
          </ul>
          <p><b>Yeast:</b></p>
          <ul class="collection">
            <li class="collection-item">
              ${ingredients.yeast}
            </li>
          </ul>
      </div>
    </div>
  </div>
</div>

<div id="beer-comments" class="row">
  <div class="col s12">
    <div class="card">
      <div class="card-content">
        <span class="card-title">Comments</span>
          <div class="divider"></div>
          <div class="comments-list">
            <div id="commentList">
            ${comment ? `<ul class="collection">
            ${comment.map(comment =>`
              <li class="collection-item">
                <div class="date">${new Date(comment.dateComment).getUTCMonth()+1}/${new Date(comment.dateComment).getUTCFullYear()}</div> 
                <div>${comment.comment}</div>
              </li>
            `).join("")}` : "<ul class='collection'></ul>"}
              
            </ul>
            </div>
          </div>
          <form id="comment-form" class="comment-form" novalidate>
            <div class="comment-input">
              <label for="comment">Comments for ${name}</label>
              <input required id="comment" placeholder="Add your comment" class="input primary" type="text">
            </div>
            <button class="waves-effect waves-light btn amber grey-text text-darken-4" type="submit" data-id="${beerId}">Add comment</button>
            <div class="comment-loader hide">
              <div class="progress">
                  <div class="indeterminate green darken-4"></div>
              </div>
            </div>
          </form>

        </div>
      
    </div>
  </div>
</div>
`;



const renderDetail = async id => {
  try {
    toggleLoader();
    const container = document.querySelector("#main-beers");
    const [beer] = await Promise.all([getBeer(id)]);
    container.innerHTML = detailTemplate(beer);
  } catch (err) {
    console.error(err);
  } finally {
    const card = document.querySelector(".card.horizontal");
    const likeButton = card.querySelector(".like");
    const beerId = likeButton.dataset.id;
    const ingredientList = document.querySelectorAll("#beer-ingredients li");
    const commentForm = document.querySelector("#comment-form");
    const addCommentButton = document.querySelector("#card-detail.card #add-comment-btn");
    console.log(commentForm);
    
    goToBottom(addCommentButton);

    ingredientList.forEach((li) => {
      toggleLIContent(li);
    });

    addBeerLike(card);
    loadChekedLikes(likeButton , beerId);

    addBeerComment(commentForm);
    toggleLoader();
  }
};

export default renderDetail;
