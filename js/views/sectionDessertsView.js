import SectionItemsView from "./sectionItemsView.js";

class SectionDessertsView extends SectionItemsView {
  _parentElement = document
    .querySelector("#desserts")
    .querySelector(".section-content");
}

export default new SectionDessertsView();
