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
    // close on button click
    const sidePanelCloseBtn =
      this._parentElement.querySelector(".close-side-panel");
    sidePanelCloseBtn.addEventListener("click", function () {
      handler();
    });
    // close on Esc keyboard press
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        handler();
      }
    });
    // close on outside click
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
    // close on Android back button press
    document.addEventListener("backbutton", function (e) {
      if (this.#isOpen()) {
        e.preventDefault();
        handler();
      }
    }.bind(this), false);
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
        <button class="close-side-panel">
          <i class="ph ph-x"></i>
        </button>
        <div class="side-panel-content">
          ${this._generatePanelHeader()}
          ${this.#generateListMarkup(items)}
          ${this._generatePanelBottomMarkup(this._data)}
          ${this._generatePanelActions(this._data)}
        </div>
      </div>
    `;
  }

  _generatePanelHeader() {
    return "";
  }

  _generatePanelBottomMarkup(data) {
    return "";
  }

  _generatePanelActions(data) {
    return "";
  }

  #generateListMarkup(items) {
    if (items.length === 0) {
      return this._generateEmptyListMarkup();
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

  #isOpen() {
    return !this.#getSidePanelBody().classList.contains("hidden");
  }
}
