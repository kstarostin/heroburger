import ModalView from "./modalView.js";
import {
  joinCommaSeparated,
  formatPrice,
  calculateMinimalMenuPrice,
  getIconNameForItemType,
  getPositionNamesForItemTypes,
  extractUniquePositionsTypes,
} from "../helpers.js";

class MenuConfiguratorModalView extends ModalView {
  addListenerSelectPositionItem(handler) {
    [...document.querySelectorAll(".modal-configurator-section-item")].forEach(
      function (itemEl) {
        itemEl.addEventListener(
          "click",
          function () {
            handler(itemEl.id);
          }.bind(this, false)
        );
      }.bind(this),
      false
    );
  }

  selectPositionItem(itemId) {
    const currentItemEl = document.querySelector(`#${itemId}`);

    const parentFieldSetEl = currentItemEl.closest(
      ".modal-configurator-section-item-list"
    );
    const selectedItemEl = parentFieldSetEl.querySelector(".selected");
    if (currentItemEl === selectedItemEl) {
      return this.getFormData();
    }

    const currentItemRadioInputEl = document.querySelector(
      `#${currentItemEl.dataset.inputId}`
    );
    const selectedItemRadioInputEl = document.querySelector(
      `#${selectedItemEl.dataset.inputId}`
    );

    selectedItemRadioInputEl.checked = false;
    currentItemRadioInputEl.checked = true;

    selectedItemEl.classList.remove("selected");
    currentItemEl.classList.add("selected");

    return this.getFormData();
  }

  getFormData() {
    const formEl = document.querySelector(".modal-configurator-form");
    const dataArr = [...new FormData(formEl)];
    const data = Object.fromEntries(dataArr);
    return data;
  }

  adjustConfigurationPrice(configurationPrice) {
    const configurationPriceEl = document.querySelector(".configuration-price");
    configurationPriceEl.innerHTML = formatPrice(configurationPrice);
  }

  addHandlerConfirmConfiguration(handler) {
    document
      .querySelector(".modal-configurator-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      });
  }

  _generateMarkup() {
    const form = this._data;
    return `
      <form class="modal-configurator-form">
        <input
         class="modal-configurator-header-input"
         type="text"
         name="menuId"
         value="${form.menuItem.id}"
        />
        <section class="modal-section modal-section-grid">
          <div class="modal-section-icon modal-section-${form.menuItem.type}">
            <i class="ph ph-hamburger"></i>
          </div>
          <div class="modal-section-content">
            ${this.#generateSectionTitleMarkup(form.menuItem.name)}
            <fieldset class="modal-configurator-section-item-list">
              ${this.#generateSectionItemMarkup(
                form.firstPosition[0],
                0,
                "firstPosition",
                "large"
              )}
            </fieldset>
          </div>
        </section>
        ${this.#generatePositionSectionMarkup(
          form.secondPosition,
          "secondPosition"
        )}
        ${this.#generatePositionSectionMarkup(
          form.thirdPosition,
          "thirdPosition"
        )}
        ${this.#generatePositionSectionMarkup(
          form.fourthPosition,
          "fourthPosition"
        )}
        ${this.#generatePositionSectionMarkup(
          form.fifthPosition,
          "fifthPosition"
        )}

        <section class="modal-section">
          <div class="modal-actions">
            <button class="btn btn-primary btn-configure">
              Confirm <span class="configuration-price">${formatPrice(
                calculateMinimalMenuPrice(form.menuItem)
              )}</span>
            </button>
          </div>
        </section>
      </form>
    `;
  }

  #generatePositionSectionMarkup(positionItems, positionName) {
    if (!positionItems || positionItems.length === 0) {
      return "";
    }
    const types =
      positionItems.length === 1
        ? positionItems[0].type
        : extractUniquePositionsTypes(positionItems);
    const iconName = getIconNameForItemType(types[0]);
    const titlePrefix = positionItems.length === 1 ? "" : "Choose Your ";
    const titles =
      positionItems.length === 1
        ? positionItems[0].name
        : getPositionNamesForItemTypes(types);
    const titlesString = titles.length > 1 ? titles.join(" or ") : titles[0];

    const size = positionItems.some(
      (item) => item.ingredients && item.ingredients.length > 0
    )
      ? "medium"
      : "small";

    return `
      <section class="modal-section modal-section-grid">
        <div class="modal-section-icon modal-section-${types[0]}">
          <i class="ph ${iconName}"></i>
        </div>
        <div class="modal-section-content">
          ${this.#generateSectionTitleMarkup(`${titlePrefix}${titlesString}`)}
          <fieldset class="modal-configurator-section-item-list children">
            ${positionItems
              .map((item, index) =>
                this.#generateSectionItemMarkup(item, index, positionName, size)
              )
              .join("")}
          </fieldset>
        </div>
      </section>
    `;
  }

  #generateSectionItemMarkup(item, index, position, size) {
    return `
      <div
       id="configurator-item-${item.id}"
       class="modal-configurator-section-item ${size} ${
      index === 0 ? "selected" : ""
    }"
       data-input-id="radio-${item.id}">
        ${this.#generateMenuItemImageMarkup(item, size)}
        ${this.#generateMenuItemDescriptionMarkup(item, size)}
      </div>
      <input
       type="radio"
       id="radio-${item.id}"
       name="${position}"
       value="${item.id}"
       ${index === 0 ? "checked" : ""}
      />
    `;
  }

  #generateSectionTitleMarkup(sectionTitle) {
    if (!sectionTitle) {
      return "";
    }
    return `
      <legend class="modal-section-title">${sectionTitle}</legend>
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
      item.menuPrice
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
