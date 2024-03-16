import View from "./View.js";

export class HeaderNavLinkView extends View {
  _parentElement = document.querySelector(".header");

  addHandlerNavigateToSections(handler) {
    const linksToHandle = [
      ...this._parentElement.querySelectorAll(".main-nav-link"),
      this._parentElement.querySelector(".header-logo-link"),
    ];
    linksToHandle.forEach((link) => {
      link.addEventListener("click", function (e) {
        handler(link, e);
      });
    });
  }
}

export default new HeaderNavLinkView();
