import SidePanelView from "./sidePanelView.js";

class MiniCartView extends SidePanelView {
  _actionBtn = document.querySelector(".btn-header-panel-cart");

  _generateItemMarkup(item) {
    return `
      <li class="side-panel-list-item">
        <p>${item}</p>
      </li>
    `;
  }

  _generatePanelActions() {
    return `
      <div class="side-panel-actions">
        <button class="btn btn-primary">Checkout</button>
      </div>
    `;
  }
}

export default new MiniCartView();
