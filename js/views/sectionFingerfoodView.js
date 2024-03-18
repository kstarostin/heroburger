import SectionItemsView from "./sectionItemsView.js";

class SectionFingerfoodView extends SectionItemsView {
  _parentElement = document
    .querySelector("#fingerfood")
    .querySelector(".section-content");
  _itemType = "fingerfood";
}

export default new SectionFingerfoodView();
