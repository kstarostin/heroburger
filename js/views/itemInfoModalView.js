import ModalView from "./modalView.js";
import { joinCommaSeparated, formatWeightGramm } from "../helpers.js";

class ItemInfoModalView extends ModalView {
  _generateMarkup() {
    return `
      ${this.#generateImageMarkup(this._data.image, this._data.name)}
      <div class="modal-text">
        <h1 class="modal-title">${this._data.name}</h1>
        ${this.#generateAttributesMarkup(this._data.ingredients)}
        ${this.#generateNutritionsMarkup(this._data)}
      </div>
    `;
  }

  #generateImageMarkup(image, name) {
    if (!image.original.jpg || !image.original.webp) {
      return "";
    }
    return `
      <picture>
        <source
          srcset="${image.original.webp}"
          type="image/webp"
        />
        <source
          srcset="${image.original.jpg}"
          type="image/jpg"
        />
        <img
          src="${image.original.webp}"
          class="modal-img"
          alt="Picture of ${name} menu item"
        />
      </picture>
    `;
  }

  #generateAttributesMarkup(ingredients) {
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
              <th>Per ${formatWeightGramm(100)}</th>
              <th>Per portion (${formatWeightGramm(item.weightGramm)})</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Calories</th>
              <td>${item.nutrientsPortion.calories} kcal</td>
              <td>${this.#calculateForPortion(
                item.nutrientsPortion.calories,
                item.weightGramm
              )} kcal</td>
            </tr>
            <tr>
              <th>Protein</th>
              <td>${formatWeightGramm(item.nutrientsPortion.protein)}</td>
              <td>${formatWeightGramm(
                this.#calculateForPortion(
                  item.nutrientsPortion.protein,
                  item.weightGramm
                )
              )}</td>
            </tr>
            <tr>
              <th>Carbohydrates</th>
              <td>${formatWeightGramm(item.nutrientsPortion.carbohydrates)}</td>
              <td>${formatWeightGramm(
                this.#calculateForPortion(
                  item.nutrientsPortion.carbohydrates,
                  item.weightGramm
                )
              )}</td>
            </tr>
            <tr>
              <th>Sugar</th>
              <td>${formatWeightGramm(item.nutrientsPortion.sugars)}</td>
              <td>${formatWeightGramm(
                this.#calculateForPortion(
                  item.nutrientsPortion.sugars,
                  item.weightGramm
                )
              )}</td>
            </tr>
            <tr>
              <th>Fat</th>
              <td>${formatWeightGramm(item.nutrientsPortion.fat)}</td>
              <td>${formatWeightGramm(
                this.#calculateForPortion(
                  item.nutrientsPortion.fat,
                  item.weightGramm
                )
              )}</td>
            </tr>
            <tr>
              <th>Fiber</th>
              <td>${formatWeightGramm(item.nutrientsPortion.fiber)}</td>
              <td>${formatWeightGramm(
                this.#calculateForPortion(
                  item.nutrientsPortion.fiber,
                  item.weightGramm
                )
              )}</td>
            </tr>
            <tr>
              <th>Sodium</th>
              <td>${formatWeightGramm(item.nutrientsPortion.sodium)}</td>
              <td>${formatWeightGramm(
                this.#calculateForPortion(
                  item.nutrientsPortion.sodium,
                  item.weightGramm
                )
              )}</td>
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
