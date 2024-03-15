import View from "./View.js";
import { truncate, formatPrice } from "../helpers.js";

export default class SectionItemsView extends View {
  _parentElement;

  _generateMarkup() {
    return this._data
      .map((item) => {
        return this._generateItemMarkup(item);
      })
      .join("");
  }

  _generateItemMarkup(item) {
    return `
      <div id="${item.id}" class="item ${item.new ? "item-new" : ""}">
        <div class="item-content">
          <div class="item-img-container">
            <picture>
              <source
                srcset="${item.image.medium.webp}"
                type="image/webp"
              />
              <source
                srcset="${item.image.medium.jpg}"
                type="image/jpg"
              />
              <img
                src="${item.image.medium.webp}"
                class="item-img"
                alt="Picture of ${item.name} menu item"
              />
            </picture>
            <a class="item-info-link" href="#">
              <i class="ph ph-info"></i>
            </a>
          </div>
          <div class="item-text">
            ${this._generateTagsMarkup(item.tags)}
            <p class="item-title">${item.name}</p>
            ${this._generateDescriptionMarkup(item.description)}
            ${this._generateAttributesMarkup(item.ingredients)}
          </div>
        </div>
        <div class="item-actions">
          <div class="item-save">
            <a href="#" class="btn btn-save btn-square">
              <i class="icon ph-fill ph-heart"></i>
            </a>
          </div>
          <div class="item-add">
            <a href="#" class="btn btn-primary">
              <span>${formatPrice(item.price)}</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  _generateTagsMarkup(tags) {
    if (tags && tags.length > 0) {
      return `
        <div class="item-tags">
          ${tags
            .map((tag) => {
              return this.#generateTagMarkup(tag);
            })
            .join("")}
        </div>
      `;
    }
    return "";
  }

  #generateTagMarkup(tag) {
    return `
    <div class="tag tag-${tag}">
      <span>${tag}</span>
    </div>
    `;
  }

  _generateDescriptionMarkup(description) {
    let truncatedDescription = description;
    if (description.length > 40) {
      truncatedDescription = truncate(description, 40);
    }
    return `
    <p class="item-description">
      ${truncatedDescription}
      <a class="link" href="#">more</a>
    </p>
    `;
  }

  _generateAttributesMarkup(ingredients) {
    if (ingredients && ingredients.length > 0) {
      return `
        <ul class="item-attributes">
          <li class="item-attribute">
            <i class="icon ph ph-list-bullets"></i>
            <span>
              ${ingredients
                .map((ingredient) => ingredient.toLowerCase())
                .join(", ")}
            </span>
          </li>
        </ul>
      `;
    }
    return "";
  }
}
