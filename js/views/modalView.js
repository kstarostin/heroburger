import View from "./View.js";

export default class ModalView extends View {
  _parentElement = document.querySelector(".modal-content");

  _modal = document.querySelector(".modal-body");
  _overlay = document.querySelector(".overlay");

  addHandlerCloseModal(handler) {
    const modalCloseBtn = this._modal.querySelector(".close-modal");
    // close on button or overlay click
    [modalCloseBtn, this._overlay].forEach((element) => {
      element.addEventListener("click", function () {
        handler();
      });
    });
    // close on Esc keyboard press
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        handler();
      }
    });
    // close on Android back button press
    document.addEventListener("deviceready", function () {
      document.addEventListener("backbutton", function (e) {
        window.alert("backbutton");
        if (this.#isOpen()) {
          window.alert("open");
          e.preventDefault();
          handler();
        }
      }.bind(this), false);
    }.bind(this), false);
  }

  open() {
    this._modal.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  close() {
    this._modal.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  #isOpen() {
    return !this._modal.classList.contains("hidden");
  }
}
