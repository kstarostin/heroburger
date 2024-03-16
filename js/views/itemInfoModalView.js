import ModalView from "./modalView.js";

class ItemInfoModalView extends ModalView {
  addHandlerRender(handler) {
    document.querySelectorAll(".item").forEach((item) => {
      const itemId = item.id;

      [
        item.querySelector(".item-info-link"),
        item.querySelector(".link"),
      ].forEach((link) => {
        link.addEventListener(
          "click",
          function (e) {
            console.log(e);
            e.preventDefault();
            handler(itemId, this._modal, this._overlay);
          }.bind(this),
          false
        );
      });
    });
  }

  _generateMarkup() {
    return `
      <picture>
        <source
          srcset="${this._data.image.original.webp}"
          type="image/webp"
        />
        <source
          srcset="${this._data.image.original.jpg}"
          type="image/jpg"
        />
        <img
          src="${this._data.image.original.webp}"
          class="modal-img"
          alt="Picture of ${this._data.name} menu item"
        />
      </picture>
      <div class="modal-text">
        <h1 class="modal-title">${this._data.name}</h1>
        <p class="modal-description">
          ${this._data.description}
        </p>
      </div>
    `;
  }
}

export default new ItemInfoModalView();
