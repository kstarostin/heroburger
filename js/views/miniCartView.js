import SidePanelView from "./sidePanelView.js";
import { formatPrice } from "../helpers.js";

class MiniCartView extends SidePanelView {
  _actionBtn = document.querySelector(".btn-header-panel-cart");

  addHandlerRemoveCartEntry(handler) {
    document.querySelectorAll(".btn-panel-remove").forEach((item) => {
      item.addEventListener("click", function () {
        handler(item.dataset.entryNumber);
      });
    });
  }

  _extractItems(data) {
    return data.entries;
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
            <p class="side-panel-item-textbox-entry">${formatPrice(
              entry.price
            )}</p>
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
      <p class="side-panel-text">Total price: ${formatPrice(
        cart.totalPrice
      )}</p>
    `;
  }

  _generatePanelActions(cart) {
    if (cart.totalPrice === 0) {
      return "";
    }
    return `
      <div class="side-panel-actions">
        <button class="btn btn-primary">Checkout</button>
      </div>
    `;
  }
}

export default new MiniCartView();
