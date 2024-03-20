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
        console.log(this.#getSidePanelBody());
        if (
          (!e.target.closest(".btn-header-panel") ||
            !e.target.closest(".btn-header-panel") === this._actionBtn) &&
          !e.target.closest(".side-panel-body")
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
    console.log("show");
    this.#getSidePanelBody().classList.remove("hidden");
  }

  hide() {
    console.log("hide");
    this.#getSidePanelBody().classList.add("hidden");
  }

  _generateMarkup() {
    if (!this._data || this._data.length === 0) {
      return this.#generateEmptyListMarkup();
    }
    return `
      <div class="side-panel-body hidden">
        <div class="side-panel-content">
          <ul class="side-panel-list">
            ${this._data.map((item) => this._generateItemMarkup(item)).join("")}
          </ul>
          ${this._generatePanelActions()}
        </div>
      </div>
    `;
  }

  _generatePanelActions() {
    return "";
  }

  #getSidePanelBody() {
    return this._parentElement.querySelector(".side-panel-body");
  }

  #generateEmptyListMarkup() {
    return `
      <div class="side-panel-body hidden">
        <div class="side-panel-content">
          <ul class="side-panel-list">
            <li class="side-panel-list-item">
              <div class="side-panel-list-item-content">
                <p class="side-panel-item-text">No items</p>
              </div>
            </li>
          </ul>
          ${this._generatePanelActions()}
        </div>
      </div>
    `;
  }
}
