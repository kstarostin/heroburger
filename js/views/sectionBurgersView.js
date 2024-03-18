import SectionItemsView from "./sectionItemsView.js";

class SectionBurgersView extends SectionItemsView {
  _parentElement = document
    .querySelector("#burgers")
    .querySelector(".section-content");
  _itemType = "burger";
}

export default new SectionBurgersView();
