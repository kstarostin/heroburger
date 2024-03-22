import ModalView from "./modalView.js";

class OrderPlacedModalView extends ModalView {
  _generateMarkup() {
    return `
      <div class="modal-text">
        <h1 class="modal-order-placed-title">Your order is successful!</h1>
        <p class="modal-order-placed-description">
          Estimated delivery time is <span class="modal-order-placed-time">${this._data.deliveryTime} minutes</span>
        </p>
        <div class="modal-order-placed-picture">
          <i class="ph ph-confetti"></i>
        </div>
      </div>
    `;
  }
}

export default new OrderPlacedModalView();
