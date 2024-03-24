import ModalView from "./modalView.js";

class LoaderModalView extends ModalView {
  _parentElement = document.querySelector("#loader");

  _wheel = this._parentElement.querySelector(".loader-wheel");
  _overlay = this._parentElement.querySelector(".loader-overlay");

  render(data) {
    this._wheel.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  clear() {
    this._wheel.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }
}

export default new LoaderModalView();
