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
}

export default new MiniCartView();
