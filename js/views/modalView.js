import View from "./View.js";

export default class ModalView extends View {
  _parentElement = document.querySelector(".modal-content");

  _modal = document.querySelector(".modal-body");
  _overlay = document.querySelector(".overlay");

  addHandlerCloseModal(handler) {
    const modalCloseBtn = this._modal.querySelector(".close-modal");

    [modalCloseBtn, this._overlay].forEach((element) => {
      element.addEventListener("click", function () {
        handler();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        handler();
      }
    });
  }

  open() {
    this._modal.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  close() {
    this._modal.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }
}
