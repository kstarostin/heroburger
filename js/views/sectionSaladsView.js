import SectionItemsView from "./sectionItemsView.js";

class SectionSaladsView extends SectionItemsView {
  _parentElement = document
    .querySelector("#salads")
    .querySelector(".section-content");
}

export default new SectionSaladsView();
