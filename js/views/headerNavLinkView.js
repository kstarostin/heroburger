import View from "./View.js";

export class HeaderNavLinkView extends View {
  _parentElement = document.querySelector(".header");

  addHandlerNavigateToSections(handler) {
    const linksToHandle = [
      ...this._parentElement.querySelectorAll(".main-nav-link"),
      this._parentElement.querySelector(".header-logo-link"),
    ];
    linksToHandle.forEach((link) => {
      link.addEventListener(
        "click",
        function (e) {
          handler(link, this._parentElement, e);
        }.bind(this),
        false
      );
    });
  }

  addHandlerMobileNav(handler) {
    const btnNavElement = document.querySelector(".btn-mobile-nav");

    btnNavElement.addEventListener(
      "click",
      function () {
        handler(this._parentElement);
      }.bind(this),
      false
    );
  }
}

export default new HeaderNavLinkView();
