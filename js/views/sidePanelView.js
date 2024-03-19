import View from "./View.js";

export default class SidePanelView extends View {
  _parentElement = document.querySelector(".side-panel-body");
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
          (!e.target.closest(".btn-header") ||
            !e.target.closest(".btn-header") === this._actionBtn) &&
          !this._parentElement.contains(e.target)
        ) {
          handler();
        }
      }.bind(this),
      false
    );
  }

  render(data) {
    super.render(data);
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._clear();
    this._parentElement.classList.add("hidden");
  }

  _generateMarkup() {
    if (!this._data || this._data.length === 0) {
      return "No items";
    }
    return `
      <ul class="side-panel-list">
        ${this._data.map((item) => this._generateItemMarkup(item)).join("")}
      </ul>
    `;
  }
}
