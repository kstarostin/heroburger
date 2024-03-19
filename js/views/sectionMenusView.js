import SectionItemsView from "./sectionItemsView.js";
import {
  formatPrice,
  joinCommaSeparated,
  extractMinimalItemPrice,
} from "../helpers.js";

class SectionMenusView extends SectionItemsView {
  _parentElement = document
    .querySelector("#menus")
    .querySelector(".section-content");
  _itemType = "menu";

  _generateMarkup() {
    return this._data
      .filter((item) => item.type === this._itemType)
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
          <btn class="btn btn-save ${
            item.saved ? "btn-save-active" : ""
          } btn-square">
            <i class="icon ph-fill ph-heart"></i>
          </btn>
          <btn class="btn btn-primary">
            <span>From ${formatPrice(
              this.#calculateMinimalMenuPrice(item)
            )}</span>
          </btn>
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
              ${joinCommaSeparated(item.ingredients)}
            </span>
          </li>
          ${this.#generatePositionMarkup(item.secondPosition)}
          ${this.#generatePositionMarkup(item.thirdPosition)}
          ${this.#generatePositionMarkup(item.fourthPosition)}
          ${this.#generatePositionMarkup(item.fifthPosition)}
        </ul>
      `;
    }
    return "";
  }

  #generatePositionMarkup(positionItems) {
    if (!positionItems || positionItems.length === 0) {
      return "";
    }
    const type =
      positionItems.length === 1
        ? positionItems[0].type
        : this.#extractUniquePositionsTypes(positionItems)[0];
    const iconName = this.#getIconNameForItemType(type);
    const positionName =
      positionItems.length === 1
        ? positionItems[0].name
        : this.#getPositionNameForItemType(type);
    return `
      <li class="item-attribute">
        <i class="icon ph ${iconName}"></i>
        <span>${positionName}</span>
      </li>
    `;
  }

  #extractUniquePositionsTypes(positionItems) {
    const allTypes = positionItems.map((positionItem) => positionItem.type);
    return allTypes.filter(function (type, index) {
      return allTypes.indexOf(type) === index;
    });
  }

  #getIconNameForItemType(itemType) {
    const typeIconMap = new Map();
    typeIconMap.set("burger", "ph-hamburger");
    typeIconMap.set("fingerfood", "ph-popcorn");
    typeIconMap.set("salad", "ph-carrot");
    typeIconMap.set("dessert", "ph-cookie");
    typeIconMap.set("drink", "ph-beer-bottle");

    return typeIconMap.get(itemType);
  }

  #getPositionNameForItemType(itemType) {
    const typeNameMap = new Map();
    typeNameMap.set("burger", "Hero Burger");
    typeNameMap.set("fingerfood", "Sidekick Fingerfood");
    typeNameMap.set("salad", "Salad");
    typeNameMap.set("dessert", "Dessert");
    typeNameMap.set("drink", "Drink");

    return typeNameMap.get(itemType);
  }

  #calculateMinimalMenuPrice(item) {
    return (
      item.price +
      extractMinimalItemPrice(item.secondPosition) +
      extractMinimalItemPrice(item.thirdPosition) +
      extractMinimalItemPrice(item.fourthPosition) +
      extractMinimalItemPrice(item.fifthPosition)
    );
  }
}

export default new SectionMenusView();
