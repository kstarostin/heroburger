import ModalView from "./modalView.js";
import { formatPrice } from "../helpers.js";
import {
  FORM_PATTERN_NAME,
  FORM_PATTERN_PHONE,
  FORM_PATTERN_STREET,
  FORM_PATTERN_APARTMENT,
  FORM_PATTERN_ZIP,
  FORM_PATTERN_TOWN,
} from "../config.js";

class CheckoutModalView extends ModalView {
  addHandlerPlaceOrder(handler) {
    document
      .querySelector(".modal-checkout-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      });
  }

  _generateMarkup() {
    const cart = this._data.cart;
    const deliveryAddress = cart.deliveryAddress;
    const invalidFields = this._data.invalidFields;
    return `
      <form class="modal-checkout-form">
        <section class="modal-checkout-section">
          <h2 class="modal-checkout-section-title">Delivery Address</h2>
          <div class="modal-checkout-section-content">
            <div class="checkout-address-grid">
              <div class="modal-checkout-text-input-group">
                <label for="name" class="mandatory">Name*</label>
                <input
                  id="name"
                  class="modal-checkout-text-input ${
                    invalidFields.includes("name") ? "invalid" : ""
                  }"
                  placeholder="John Smith"
                  value="${deliveryAddress.name}"
                  name="name"
                  type="text"
                  autocomplete="off"
                  required
                  pattern="${FORM_PATTERN_NAME}"
                />
              </div>
              <div class="modal-checkout-text-input-group">
                <label for="phone" class="mandatory">Phone*</label>
                <input
                  id="phone"
                  class="modal-checkout-text-input ${
                    invalidFields.includes("phone") ? "invalid" : ""
                  }"
                  placeholder="555-123-4567"
                  value="${deliveryAddress.phone}"
                  name="phone"
                  type="text"
                  autocomplete="off"
                  required
                  pattern="${FORM_PATTERN_PHONE}"
                />
              </div>
              <div class="modal-checkout-text-input-group">
                <label for="street" class="mandatory">Street*</label>
                <input
                  id="street"
                  class="modal-checkout-text-input ${
                    invalidFields.includes("street") ? "invalid" : ""
                  }"
                  placeholder="8850 Santa Monica Blvd"
                  value="${deliveryAddress.street}"
                  name="street"
                  type="text"
                  autocomplete="off"
                  required
                  pattern="${FORM_PATTERN_STREET}"
                />
              </div>
              <div class="modal-checkout-text-input-group">
                <label for="apartment">Apartment, suite, etc.</label>
                <input
                  id="apartment"
                  class="modal-checkout-text-input ${
                    invalidFields.includes("apartment") ? "invalid" : ""
                  }"
                  placeholder="12-a"
                  value="${deliveryAddress.apartment}"
                  name="apartment"
                  type="text"
                  autocomplete="off"
                  pattern="${FORM_PATTERN_APARTMENT}"
                />
              </div>
              <div class="modal-checkout-text-input-group">
                <label for="zip" class="mandatory">Postcode*</label>
                <input
                  id="zip"
                  class="modal-checkout-text-input ${
                    invalidFields.includes("zip") ? "invalid" : ""
                  }"
                  placeholder="90069"
                  value="${deliveryAddress.zip}"
                  name="zip"
                  type="text"
                  autocomplete="off"
                  required
                  pattern="${FORM_PATTERN_ZIP}"
                />
              </div>
              <div class="modal-checkout-text-input-group">
                <label for="town" class="mandatory">Town*</label>
                <input
                  id="town"
                  class="modal-checkout-text-input ${
                    invalidFields.includes("town") ? "invalid" : ""
                  }"
                  placeholder="West Hollywood"
                  value="${deliveryAddress.town}"
                  name="town"
                  type="text"
                  autocomplete="off"
                  required
                  pattern="${FORM_PATTERN_TOWN}"
                />
              </div>
              <div class="modal-checkout-checkbox-input-group">
                <input
                  id="saved"
                  name="saved"
                  type="checkbox"
                  ${deliveryAddress.saved ? "checked" : ""}
                />
                <label for="saved">Save for future orders</label>
              </div>
            </div>
            <p class="modal-checkout-disclaimer">*Required fields</p>
          </div>
        </section>

        <section class="modal-checkout-section">
          <h2 class="modal-checkout-section-title">Order Details</h2>
          <div class="modal-checkout-section-content">
            ${this.#generateEntryListMarkup(cart.entries)}
            ${this.#generateTotalsMarkup(cart)}
          </div>
        </section>

        <section class="modal-checkout-section">
          <div class="modal-checkout-section-content checkout-actions">
            <button class="btn btn-primary btn-place-order">
              <span>Order</span>
            </button>
          </div>
        </section>
      </form>
    `;
  }

  #generateEntryListMarkup(entries) {
    return `
      <ul class="modal-checkout-entries-list">
        ${entries.map((entry) => this.#generateEntryMarkup(entry)).join("")}
      </ul>
    `;
  }

  #generateEntryMarkup(entry) {
    return `
      <li class="modal-checkout-entries-list-item">
        <picture>
          <source
            srcset="${entry.item.image.small.webp}"
            type="image/webp"
          />
          <source
            srcset="${entry.item.image.small.jpg}"
            type="image/jpg"
          />
          <img
            src="${entry.item.image.small.webp}"
            class="modal-checkout-item-img"
            alt="Picture of ${entry.item.name} in checkout summary"
          />
        </picture>
        <div class="modal-checkout-item-text">
          <p class="modal-checkout-item-name">${entry.item.name}</p>
        </div>
        <div class="modal-checkout-item-price">
          ${formatPrice(entry.price)}
        </div>
      </li>
    `;
  }

  #generateTotalsMarkup(cart) {
    return `
      <div class="modal-checkout-totals">
        <p class="modal-checkout-price-text">
          <span>Total price:</span>
          <span>${formatPrice(cart.totalPrice)}</span>
        </p>
        <p class="modal-checkout-price-text">
          <span>Delivery cost:</span>
          <span>${formatPrice(cart.deliveryCost)}</span>
        </p>
        <p class="modal-checkout-price-text total">
          <span>Total cost:</span>
          <span>${formatPrice(cart.totalCost)}</span>
        </p>
      </div>
    `;
  }
}

export default new CheckoutModalView();
