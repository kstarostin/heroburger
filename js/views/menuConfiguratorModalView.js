import ModalView from "./modalView.js";
import {
  joinCommaSeparated,
  formatPrice,
  getIconNameForItemType,
  getPositionNameForItemType,
  extractUniquePositionsTypes,
} from "../helpers.js";

class MenuConfiguratorModalView extends ModalView {
  addListenerSelectPositionItem() {
    [...document.querySelectorAll(".modal-configurator-section-item")].forEach(
      function (itemEl) {
        itemEl.addEventListener(
          "click",
          function () {
            this.selectPositionItem(itemEl);
          }.bind(this, false)
        );
      }.bind(this),
      false
    );
  }

  selectPositionItem(currentItemEl) {
    const parentFieldSetEl = currentItemEl.closest(
      ".modal-configurator-section-item-list"
    );
    const selectedItemEl = parentFieldSetEl.querySelector(".selected");
    if (currentItemEl === selectedItemEl) {
      return;
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
         value="${form.menuId}"
        />
        <section class="modal-section modal-section-grid">
          <div class="modal-section-icon">
            <i class="ph ph-hamburger"></i>
          </div>
          <div class="modal-section-content">
            ${this.#generateSectionTitleMarkup(form.menuName)}
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
            <button class="btn btn-primary btn-place-order">
              <span>Confirm</span>
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
    const type =
      positionItems.length === 1
        ? positionItems[0].type
        : extractUniquePositionsTypes(positionItems)[0];
    const iconName = getIconNameForItemType(type);
    const titlePrefix = positionItems.length === 1 ? "" : "Choose Your ";
    const title =
      positionItems.length === 1
        ? positionItems[0].name
        : getPositionNameForItemType(type);

    return `
      <section class="modal-section modal-section-grid">
        <div class="modal-section-icon">
          <i class="ph ${iconName}"></i>
        </div>
        <div class="modal-section-content">
          ${this.#generateSectionTitleMarkup(`${titlePrefix}${title}`)}
          <fieldset class="modal-configurator-section-item-list children">
            ${positionItems
              .map((item, index) =>
                this.#generateSectionItemMarkup(
                  item,
                  index,
                  positionName,
                  item.ingredients && item.ingredients.length > 0
                    ? "medium"
                    : "small"
                )
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
