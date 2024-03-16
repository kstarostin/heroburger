import View from "./View.js";

export default class ModalView extends View {
  _parentElement = document.querySelector(".modal-content");

  _modal = document.querySelector(".modal");
  _overlay = document.querySelector(".overlay");

  addHandlerCloseModal(handler) {
    const modalCloseBtn = this._modal.querySelector(".close-modal");

    [modalCloseBtn, this._overlay].forEach((element) => {
      element.addEventListener(
        "click",
        function () {
          handler(this._modal, this._overlay);
        }.bind(this),
        false
      );
    });
  }
}
