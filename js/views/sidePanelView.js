import View from "./View.js";

export default class SidePanelView extends View {
  _parentElement = document.querySelector(".side-panel");
  _actionBtn;

  addHandlerRender(handler) {
    this._actionBtn.addEventListener("click", function () {
      handler();
    });
  }

  addHandlerClose(handler) {
    document.body.addEventListener(
      "click",
      function (e) {
        if (
          (!e.target.closest(".btn-header-panel") ||
            !e.target.closest(".btn-header-panel") === this._actionBtn) &&
          !e.target.closest(".side-panel-body") &&
          this.#getSidePanelBody()
        ) {
          handler();
        }
      }.bind(this),
      false
    );
  }

  render(data) {
    super.render(data);
    this.show();
  }

  show() {
    this.#getSidePanelBody().classList.remove("hidden");
  }

  hide() {
    this.#getSidePanelBody().classList.add("hidden");
  }

  _generateMarkup() {
    const items = this._extractItems(this._data);
    return `
      <div class="side-panel-body hidden">
        <div class="side-panel-content">
          ${this.#generateListMarkup(items)}
          ${this._generatePanelBottomMarkup(this._data)}
          ${this._generatePanelActions(this._data)}
        </div>
      </div>
    `;
  }

  _generatePanelBottomMarkup(data) {
    return "";
  }

  _generatePanelActions(data) {
    return "";
  }

  #generateListMarkup(items) {
    if (items.length === 0) {
      return this.#generateEmptyListMarkup();
    }
    return `
      <ul class="side-panel-list">
        ${items.map((item) => this._generateItemMarkup(item)).join("")}
      </ul>
    `;
  }

  #getSidePanelBody() {
    return this._parentElement.querySelector(".side-panel-body");
  }

  #generateEmptyListMarkup() {
    return `
      <ul class="side-panel-list">
        <li class="side-panel-list-item">
          <div class="side-panel-list-item-content">
            <div class="side-panel-item-textbox">
              <p class="side-panel-item-textbox-entry">No items</p>
            </div>
          </div>
        </li>
      </ul>
    `;
  }
}
