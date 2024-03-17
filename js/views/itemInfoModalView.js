import ModalView from "./modalView.js";
import { joinCommaSeparated } from "../helpers.js";

class ItemInfoModalView extends ModalView {
  addHandlerRender(handler) {
    document.querySelectorAll(".item").forEach((item) => {
      const itemId = item.id;

      [
        item.querySelector(".item-info-link"),
        item.querySelector(".link"),
      ].forEach((link) => {
        link.addEventListener(
          "click",
          function (e) {
            e.preventDefault();
            handler(itemId, this._modal, this._overlay);
          }.bind(this),
          false
        );
      });
    });
  }

  _generateMarkup() {
    return `
      <picture>
        <source
          srcset="${this._data.image.original.webp}"
          type="image/webp"
        />
        <source
          srcset="${this._data.image.original.jpg}"
          type="image/jpg"
        />
        <img
          src="${this._data.image.original.webp}"
          class="modal-img"
          alt="Picture of ${this._data.name} menu item"
        />
      </picture>
      <div class="modal-text">
        <h1 class="modal-title">${this._data.name}</h1>
        <p class="modal-description">
          ${this._data.description}
        </p>
        ${this._generateAttributesMarkup(this._data.ingredients)}
        ${this.#generateNutritionsMarkup(this._data)}
      </div>
    `;
  }

  _generateAttributesMarkup(ingredients) {
    if (ingredients && ingredients.length > 0) {
      return `
        <ul class="item-attributes">
          <li class="item-attribute">
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

  #generateNutritionsMarkup(item) {
    if (item.weightGramm === undefined || item.nutrientsPortion === undefined) {
      return "";
    }
    return `
    <div class="modal-nutritions">
      <i class="icon ph ph-fire"></i>
      <div>
        <table class="modal-nutritions-table">
          <thead>
            <tr>
              <th>Nutrition table</td>
              <th>Per 100g</th>
              <th>Per portion (${item.weightGramm}g)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Calories</th>
              <td>${item.nutrientsPortion.calories}kcal</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.calories,
                item.weightGramm
              )}kcal</td>
            </tr>
            <tr>
              <th>Protein</th>
              <td>${item.nutrientsPortion.protein}g</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.protein,
                item.weightGramm
              )}g</td>
            </tr>
            <tr>
              <th>Carbohydrates</th>
              <td>${item.nutrientsPortion.carbohydrates}g</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.carbohydrates,
                item.weightGramm
              )}g</td>
            </tr>
            <tr>
              <th>Sugar</th>
              <td>${item.nutrientsPortion.sugars}g</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.sugars,
                item.weightGramm
              )}g</td>
            </tr>
            <tr>
              <th>Fat</th>
              <td>${item.nutrientsPortion.fat}g</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.fat,
                item.weightGramm
              )}g</td>
            </tr>
            <tr>
              <th>Fiber</th>
              <td>${item.nutrientsPortion.fiber}g</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.fiber,
                item.weightGramm
              )}g</td>
            </tr>
            <tr>
              <th>Sodium</th>
              <td>${item.nutrientsPortion.sodium}g</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.sodium,
                item.weightGramm
              )}g</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;
  }

  #calculateForPortion(weight, portionWeight) {
    return Math.round((weight / 100) * portionWeight * 100) / 100;
  }
}

export default new ItemInfoModalView();
