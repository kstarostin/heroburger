import ModalView from "./modalView.js";
import { formatPrice } from "../helpers.js";

class CheckoutModalView extends ModalView {
  _generateMarkup() {
    const cart = this._data;
    const deliveryAddress = cart.deliveryAddress;
    console.log(cart);
    return `
      <form class="modal-checkout-form">
        <section class="modal-checkout-section">
          <h2 class="modal-checkout-section-title">Delivery Address</h2>
          <div class="modal-checkout-section-content checkout-address">
            <div>
              <label for="name" class="mandatory">Name*</label>
              <input
                id="name"
                placeholder="John Smith"
                value="${deliveryAddress.name}"
                required name="name"
                type="text"
                autocomplete="off"
              />
            </div>
            <div>
              <label for="phone" class="mandatory">Phone*</label>
              <input
                id="phone"
                placeholder="555-123-4567"
                value="${deliveryAddress.phone}"
                required name="phone"
                type="text"
                autocomplete="off"
              />
            </div>
            <div>
              <label for="street" class="mandatory">Street*</label>
              <input
                id="street"
                placeholder="Santa Monica Blvd, 8850"
                value="${deliveryAddress.street}"
                required name="street"
                type="text"
                autocomplete="off"
              />
            </div>
            <div>
              <label for="apartment">Apartment, suite, etc.</label>
              <input
                id="apartment"
                placeholder="12"
                value="${deliveryAddress.apartment}"
                required name="apartment"
                type="text"
                autocomplete="off"
              />
            </div>
            <div>
              <label for="zip" class="mandatory">Postcode*</label>
              <input
                id="zip"
                placeholder="90069"
                value="${deliveryAddress.zip}"
                required name="zip"
                type="text"
                autocomplete="off"
              />
            </div>
            <div>
              <label for="town" class="mandatory">Town*</label>
              <input
                id="town"
                placeholder="West Hollywood"
                value="${deliveryAddress.town}"
                required name="town"
                type="text"
                autocomplete="off"
              />
            </div>
          </div>
        </section>

        <section class="modal-checkout-section">
          <h2 class="modal-checkout-section-title">Order Details</h2>
          <div class="modal-checkout-section-content checkout-summary">
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
