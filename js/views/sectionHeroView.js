import View from "./View.js";

export class SectionHeroView extends View {
  _parentElement = document.querySelector("#hero");

  _heroMonthElement = document.querySelector("#hero-month");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerNavigateToItems(handler) {
    const link = this._parentElement.querySelector(".link");
    link.addEventListener("click", function (e) {
      handler(link, undefined, e);
    });
  }

  render(data) {
    this._heroMonthElement.textContent = data;
  }
}

export default new SectionHeroView();
