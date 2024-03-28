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

  changeSavedItemsIcon(isFill) {
    const iconSavedEmptyEl = document.querySelector(".icon-saved-empty");
    const iconSavedFillEl = document.querySelector(".icon-saved-non-empty");
    if (isFill && !iconSavedEmptyEl.classList.contains("hidden")) {
      iconSavedEmptyEl.classList.add("hidden");
      iconSavedFillEl.classList.remove("hidden");
    }
    if (!isFill && !iconSavedFillEl.classList.contains("hidden")) {
      iconSavedFillEl.classList.add("hidden");
      iconSavedEmptyEl.classList.remove("hidden");
    }
  }

  changeCartIcon(isFill) {
    const iconCartEmptyEl = document.querySelector(".icon-cart-empty");
    const iconCartFillEl = document.querySelector(".icon-cart-non-empty");
    if (isFill && !iconCartEmptyEl.classList.contains("hidden")) {
      iconCartEmptyEl.classList.add("hidden");
      iconCartFillEl.classList.remove("hidden");
    }
    if (!isFill && !iconCartFillEl.classList.contains("hidden")) {
      iconCartFillEl.classList.add("hidden");
      iconCartEmptyEl.classList.remove("hidden");
    }
  }

  setCartIconCounter(value) {
    const iconCartEl = (document.querySelector(
      ".header-icon-cart-counter"
    ).innerHTML = value);
  }
}

export default new HeaderNavLinkView();
