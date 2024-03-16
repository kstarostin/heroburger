import SectionItemsView from "./sectionItemsView.js";
import { formatPrice } from "../helpers.js";

class SectionMenusView extends SectionItemsView {
  _parentElement = document
    .querySelector("#menus")
    .querySelector(".section-content");

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
                srcset="${item.image.large.webp}"
                type="image/webp"
              />
              <source
                srcset="${item.image.large.jpg}"
                type="image/jpg"
              />
              <img
                src="${item.image.large.webp}"
                class="item-img"
                alt="Picture of ${item.name} item"
              />
            </picture>
            <a class="item-info-link" href="#">
              <i class="ph ph-info"></i>
            </a>
          </div>
          <div class="item-text">
            ${this._generateTagsMarkup(item.tags)}
            <p class="item-title">${item.name}</p>
            ${this._generateDescriptionMarkup(item)}
            ${this._generateAttributesMarkup(item)}
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

  _generateAttributesMarkup(item) {
    if (item.ingredients && item.ingredients.length > 0) {
      return `
        <ul class="item-attributes">
          <li class="item-attribute">
            <i class="icon ph ph-hamburger"></i>
            <span>
              ${this._buildIngredientsAttributeText(item.ingredients)}
            </span>
          </li>
          ${this.#generateFingerfoodAttributeMarkup(item)}
          ${this.#generateSaladAttributeMarkup(item)}
          ${this.#generateDessertAttributeMarkup(item)}
          ${this.#generateDrinkAttributeMarkup(item)}
        </ul>
      `;
    }
    return "";
  }

  #generateFingerfoodAttributeMarkup(item) {
    if (!item.fingerfoodIncluded) {
      return "";
    }
    // todo refer fingerfood item data
    return `
    <li class="item-attribute">
      <i class="icon ph ph-popcorn"></i>
      <span>Sidekick Fingerfood</span>
    </li>
    `;
  }

  #generateSaladAttributeMarkup(item) {
    if (!item.saladIncluded) {
      return "";
    }
    // todo refer salad item data
    return `
    <li class="item-attribute">
      <i class="icon ph ph-carrot"></i>
      <span>Salad Booster</span>
    </li>
    `;
  }

  #generateDessertAttributeMarkup(item) {
    if (!item.dessertIncluded) {
      return "";
    }
    // todo refer dessert item data
    return `
    <li class="item-attribute">
      <i class="icon ph ph-cookie"></i>
      <span>Dessert Power-Up</span>
    </li>
    `;
  }

  #generateDrinkAttributeMarkup(item) {
    if (!item.drinkIncluded) {
      return "";
    }
    // todo refer drink item data
    return `
    <li class="item-attribute">
      <i class="icon ph ph-beer-bottle"></i>
      <span>Drink Energizer</span>
    </li>
    `;
  }
}

export default new SectionMenusView();
