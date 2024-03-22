import SidePanelView from "./sidePanelView.js";
import { formatPrice } from "../helpers.js";
import { CART_FREE_DELIVERY_THRESHOLD } from "../config.js";

class MiniCartView extends SidePanelView {
  _actionBtn = document.querySelector(".btn-header-panel-cart");

  addHandlerRemoveCartEntry(handler) {
    document.querySelectorAll(".btn-panel-remove").forEach((item) => {
      item.addEventListener("click", function () {
        handler(item.dataset.entryNumber);
      });
    });
  }

  addHandlerCheckoutModal(handler) {
    document
      .querySelector(".btn-checkout")
      ?.addEventListener("click", function () {
        handler();
      });
  }

  _extractItems(data) {
    return data.entries;
  }

  _generatePanelHeader() {
    return `
      <div class="side-panel-headerbox">
        <div class="side-panel-header-icon">
          <i class="ph ph-shopping-cart-simple"></i>
        </div>
      </div>
    `;
  }

  _generateItemMarkup(entry) {
    const item = entry.item;
    return `
      <li class="side-panel-list-item large">
        <div class="side-panel-list-item-content">
          <picture>
            <source
              srcset="${item.image.small.webp}"
              type="image/webp"
            />
            <source
              srcset="${item.image.small.jpg}"
              type="image/jpg"
            />
            <img
              src="${item.image.small.webp}"
              class="side-panel-item-img"
              alt="Picture of ${item.name} in cart entry"
            />
          </picture>
          <div class="side-panel-item-textbox">
            <p class="side-panel-item-textbox-entry">${item.name}</p>
            <p class="side-panel-item-textbox-entry">
              ${formatPrice(entry.price)}
            </p>
          </div>
        </div>
        <button class="btn btn-panel-remove" data-entry-number="${
          entry.entryNumber
        }">
          <i class="icon ph ph-trash-simple"></i>
        </button>
      </li>
    `;
  }

  _generatePanelBottomMarkup(cart) {
    if (cart.totalPrice === 0) {
      return "";
    }
    return `
      <div class="side-panel-textbox">
        <p class="side-panel-price-text">
          <span>Total price:</span>
          <span>${formatPrice(cart.totalPrice)}</span>
        </p>
        <p class="side-panel-price-text">
          <span>Delivery cost*:</span>
          <span>${formatPrice(cart.deliveryCost)}</span>
        </p>
        <p class="side-panel-price-text total">
          <span>Total cost:</span>
          <span>${formatPrice(cart.totalCost)}</span>
        </p>
        <p class="side-panel-disclaimer">
          *Free delivery for a total price of more than ${formatPrice(
            CART_FREE_DELIVERY_THRESHOLD
          )}
        </p>
      </div>
    `;
  }

  _generatePanelActions(cart) {
    if (cart.totalPrice === 0) {
      return "";
    }
    return `
      <div class="side-panel-actions">
        <button class="btn btn-primary btn-checkout">Checkout</button>
      </div>
    `;
  }

  _generateEmptyListMarkup() {
    return `
      <div class="side-panel-textbox">
        <p class="side-panel-empty-text">
          Add your <span class="side-panel-text-emphasize cart">Hero</span> meal!
        </p>
      </div>
    `;
  }
}

export default new MiniCartView();
