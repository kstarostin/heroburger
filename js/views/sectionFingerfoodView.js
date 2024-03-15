import SectionItemsView from "./sectionItemsView.js";

class SectionFingerfoodView extends SectionItemsView {
  _parentElement = document
    .querySelector("#fingerfood")
    .querySelector(".section-content");
}

export default new SectionFingerfoodView();
