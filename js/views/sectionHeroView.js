import View from "./View.js";

export class SectionHeroView extends View {
  _parentElement = document.querySelector("#hero");

  addHandlerNavigateToItems(handler) {
    const link = this._parentElement.querySelector(".link");
    link.addEventListener("click", function (e) {
      handler(link, e);
    });
  }
}

export default new SectionHeroView();
