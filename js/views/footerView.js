import View from "./View.js";

export class FooterView extends View {
  _parentElement = document.querySelector(".footer");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  render(data) {
    this._parentElement.querySelector(".footer-year").textContent =
      data.currentYear;
    this._parentElement
      .querySelectorAll(".footer-link-replaced")
      .forEach((element) => (element.href = data.linkUrl));
  }
}

export default new FooterView();
