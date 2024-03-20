import SidePanelView from "./sidePanelView.js";

class SavedItemsView extends SidePanelView {
  _actionBtn = document.querySelector(".btn-header-panel-saved");

  _navigationHandler;
  _removalHandler;

  addHandlerRender(handler) {
    this._actionBtn.addEventListener("click", function () {
      handler();
    });
  }

  addHandlerNavigateItem(handler) {
    document
      .querySelectorAll(".side-panel-list-item-nav-link")
      .forEach((item) => {
        item.addEventListener("click", function (e) {
          handler(item.dataset.itemId);
        });
      });
  }

  addHandlerRemoveItem(handler) {
    document.querySelectorAll(".btn-panel-remove").forEach((item) => {
      item.addEventListener("click", function () {
        handler(item.dataset.itemId);
      });
    });
  }

  _generateItemMarkup(item) {
    return `
      <li class="side-panel-list-item">
        <div class="side-panel-list-item-content side-panel-list-item-nav-link" data-item-id="${item.id}">
          <picture>
            <source
              srcset="${item.image.medium.webp}"
              type="image/webp"
            />
            <source
              srcset="${item.image.medium.jpg}"
              type="image/jpg"
            />
            <img
              src="${item.image.medium.webp}"
              class="side-panel-item-img"
              alt="Picture of ${item.name} in saved items list"
            />
          </picture>
          <p class="side-panel-item-text">${item.name}</p>
        </div>
        <button class="btn btn-panel-remove" data-item-id="${item.id}">
          <i class="icon ph ph-trash-simple"></i>
        </button>
      </li>
    `;
  }
}

export default new SavedItemsView();
