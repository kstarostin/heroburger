import SidePanelView from "./sidePanelView.js";

class SavedItemsView extends SidePanelView {
  _actionBtn = document.querySelector(".btn-header-panel-saved");

  _generateItemMarkup(item) {
    return `
      <li class="side-panel-list-item">
        <p>${item.name}</p>
      </li>
    `;
  }
}

export default new SavedItemsView();
