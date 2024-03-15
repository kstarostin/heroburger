import SectionItemsView from "./sectionItemsView.js";

class SectionDrinksView extends SectionItemsView {
  _parentElement = document
    .querySelector("#drinks")
    .querySelector(".section-content");
}

export default new SectionDrinksView();
