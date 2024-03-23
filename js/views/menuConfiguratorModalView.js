import ModalView from "./modalView.js";
import {
  joinCommaSeparated,
  formatPrice,
  getIconNameForItemType,
  getPositionNameForItemType,
  extractUniquePositionsTypes,
} from "../helpers.js";

class MenuConfiguratorModalView extends ModalView {
  _generateMarkup() {
    console.log(this._data);
    const menuItem = this._data;
    return `
      <form class="modal-configurator-form">
        <section class="modal-section modal-section-grid">
          <div class="modal-section-icon">
            <i class="ph ph-hamburger"></i>
          </div>
          <div class="modal-section-content">
            ${this.#generateSectionTitleMarkup()}
            <ul class="modal-configurator-section-item-list">
              ${this.#generateSectionItemMarkup(menuItem, "medium")}
            </ul>
          </div>
        </section>
        ${this.#generatePositionSectionMarkup(
          menuItem.secondPosition,
          "secondPosition"
        )}
        ${this.#generatePositionSectionMarkup(
          menuItem.thirdPosition,
          "thirdPosition"
        )}
        ${this.#generatePositionSectionMarkup(
          menuItem.fourthPosition,
          "fourthPosition"
        )}
        ${this.#generatePositionSectionMarkup(
          menuItem.fifthPosition,
          "fifthPosition"
        )}

        <section class="modal-section">
          <div class="modal-actions">
            <button class="btn btn-primary btn-place-order">
              <span>Confirm</span>
            </button>
          </div>
        </section>
      </form>
    `;
  }

  #generatePositionSectionMarkup(positionItems, position) {
    if (!positionItems || positionItems.length === 0) {
      return "";
    }
    const type =
      positionItems.length === 1
        ? positionItems[0].type
        : extractUniquePositionsTypes(positionItems)[0];
    const iconName = getIconNameForItemType(type);
    const positionName =
      positionItems.length === 1
        ? positionItems[0].name
        : getPositionNameForItemType(type);

    return `
      <section class="modal-section modal-section-grid">
        <div class="modal-section-icon">
          <i class="ph ${iconName}"></i>
        </div>
        <div class="modal-section-content">
          ${this.#generateSectionTitleMarkup(positionName)}
          <ul class="modal-configurator-section-item-list children">
            ${positionItems
              .map((item) => this.#generateSectionItemMarkup(item, "small"))
              .join("")}
          </ul>
        </div>
      </section>
    `;
  }

  #generateSectionItemMarkup(item, size) {
    return `
      <li class="modal-configurator-section-item ${size}">
        ${this.#generateMenuItemImageMarkup(item, size)}
        ${this.#generateMenuItemDescriptionMarkup(item, size)}
      </li>
    `;
  }

  #generateSectionTitleMarkup(sectionTitle) {
    if (!sectionTitle) {
      return "";
    }
    return `
      <h1 class="modal-section-title">${sectionTitle}</h1>
    `;
  }

  #generateMenuItemImageMarkup(item, size) {
    const image = item.image;
    if (!image[size].jpg || !image[size].webp) {
      return "";
    }
    return `
      <picture>
        <source
          srcset="${image[size].webp}"
          type="image/webp"
        />
        <source
          srcset="${image[size].jpg}"
          type="image/jpg"
        />
        <img
          src="${image[size].webp}"
          class="modal-configurator-img ${size}"
          alt="Picture of ${item.name} menu item"
        />
      </picture>
    `;
  }

  #generateMenuItemDescriptionMarkup(item, size) {
    return `
      <div class="modal-configurator-item-textbox ${size}">
        <div class="modal-configurator-item-textbox-left ${size}">
          <h1 class="modal-configurator-item-title ${size}">${item.name}</h1>
          ${this.#generateAttributesMarkup(item.ingredients, size)}
        </div>
        <div class="modal-configurator-item-textbox-right ${size}">
          <h1 class="modal-configurator-item-title ${size}">${formatPrice(
      item.price
    )}</h1>
        </div>
      </div>
    `;
  }

  #generateAttributesMarkup(ingredients, size) {
    if (ingredients && ingredients.length > 0) {
      return `
        <ul class="modal-configurator-item-attributes">
          <li class="modal-configurator-item-attribute ${size}">
            <i class="icon ph ph-list-bullets"></i>
            <span>
              ${joinCommaSeparated(ingredients)}
            </span>
          </li>
        </ul>
      `;
    }
    return "";
  }
}

export default new MenuConfiguratorModalView();
