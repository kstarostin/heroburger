import * as model from "./model.js";
import sectionHeroView from "./views/sectionHeroView.js";
import sectionMenusView from "./views/sectionMenusView.js";
import sectionBurgersView from "./views/sectionBurgersView.js";
import sectionFingerfoodView from "./views/sectionFingerfoodView.js";
import sectionSaladsView from "./views/sectionSaladsView.js";
import sectionDessertsView from "./views/sectionDessertsView.js";
import sectionDrinksView from "./views/sectionDrinksView.js";
import headerNavLinkView from "./views/headerNavLinkView.js";
import itemInfoModalView from "./views/itemInfoModalView.js";
import savedItemsView from "./views/savedItemsView.js";
import miniCartView from "./views/miniCartView.js";

const sectionItemsViewList = [
  sectionMenusView,
  sectionBurgersView,
  sectionFingerfoodView,
  sectionSaladsView,
  sectionDessertsView,
  sectionDrinksView,
];

const sectionHeroElement = document.querySelector(".section-hero");

// Sticky navigation
const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroElement);

const controlSectionHeroRender = function () {
  const currentMonth = new Date().toLocaleString("en", { month: "long" });
  sectionHeroView.render(currentMonth);
};

const controlSectionMenusRender = function () {
  sectionMenusView.render(model.getMenus());
};

const controlSectionBurgersRender = function () {
  sectionBurgersView.render(model.getBurgers());
};

const controlSectionFingerfoodRender = function () {
  sectionFingerfoodView.render(model.getFingerfood());
};

const controlSectionSaladsRender = function () {
  sectionSaladsView.render(model.getSalads());
};

const controlSectionDessertsRender = function () {
  sectionDessertsView.render(model.getDesserts());
};

const controlSectionDrinksRender = function () {
  sectionDrinksView.render(model.getDrinks());
};

const controlNavLinks = function (link, headerEl, event) {
  event.preventDefault();
  const href = link.getAttribute("href");

  // scroll back to top
  if (href === "#") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // scroll to other sections
  if (href !== "#" && href.startsWith("#")) {
    scrollToElement(href);
  }
  // close mobile nav
  if (
    headerEl &&
    (link.classList.contains("main-nav-link") ||
      link.classList.contains("btn-header-action"))
  ) {
    controlMobileNavToggle(headerEl);
  }
};

const scrollToElement = function (id) {
  const sectionEl = document.querySelector(id);
  if (!sectionEl) {
    return;
  }
  const headerOffset = 96;
  const position = sectionEl.getBoundingClientRect().top;
  const offsetPosition = position + window.scrollY - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

const controlMobileNavToggle = function (headerEl) {
  headerEl.classList.toggle("nav-open");
};

const controlModalClose = function (modal, overlay) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const controlModalOpen = function (modal, overlay) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const controlItemInfoModal = function (itemId, modal, overlay) {
  controlModalOpen(modal, overlay);
  const item = model.getItemList().filter((item) => item.id === itemId)[0];
  console.log(item);
  itemInfoModalView.render(item);
};

const controlSaveItem = function (view, item) {
  // save/unsave item
  if (
    model.state.saved.length === 0 ||
    !model.state.saved.some((id) => item.id === id)
  ) {
    model.saveItem(item);
  } else {
    model.unsaveItem(item);
  }

  // update view
  view.update([...model.getMenus(), ...model.getAllSingleItems()]);
};

const controlOpenSavedItemsPanel = function () {
  savedItemsView.render(model.getSavedItems());

  savedItemsView.addHandlerNavigateItem(controlNavigateSavedItem);
  savedItemsView.addHandlerRemoveItem(controlRemoveSavedItem);
};

const controlCloseSavedItemsPanel = function () {
  savedItemsView.hide();
};

const controlNavigateSavedItem = function (id) {
  // close panel
  controlCloseSavedItemsPanel();
  // scroll to the item
  scrollToElement(`#${id}`);
};

const controlRemoveSavedItem = function (id) {
  // load item
  const item = model.getItemById(id);
  // remove item from saved list
  model.unsaveItem(item);
  // re-render saved items panel
  controlOpenSavedItemsPanel();
  // update sections view
  getSectionItemsViewByType(item.type).update([
    ...model.getMenus(),
    ...model.getAllSingleItems(),
  ]);
};

const controlOpenMiniCartPanel = function () {
  miniCartView.render(["cart item 1", "cart item 2"]);

  miniCartView.addHandlerClose(controlCloseMiniCartPanel);
};

const controlCloseMiniCartPanel = function () {
  miniCartView.hide();
};

const getSectionItemsViewByType = function (type) {
  return sectionItemsViewList.find((view) => view._itemType === type);
};

const init = function () {
  // Header view
  headerNavLinkView.addHandlerNavigateToSections(controlNavLinks);
  headerNavLinkView.addHandlerMobileNav(controlMobileNavToggle);

  // Hero view
  sectionHeroView.addHandlerRender(controlSectionHeroRender);
  sectionHeroView.addHandlerNavigateToItems(controlNavLinks);

  // Menus section view
  sectionMenusView.addHandlerRender(controlSectionMenusRender);
  sectionMenusView.addHandlerSave(controlSaveItem);

  // Burgers section view
  sectionBurgersView.addHandlerRender(controlSectionBurgersRender);
  sectionBurgersView.addHandlerSave(controlSaveItem);

  // Fingerfood section view
  sectionFingerfoodView.addHandlerRender(controlSectionFingerfoodRender);
  sectionFingerfoodView.addHandlerSave(controlSaveItem);

  // Salads section view
  sectionSaladsView.addHandlerRender(controlSectionSaladsRender);
  sectionSaladsView.addHandlerSave(controlSaveItem);

  // Desserts section view
  sectionDessertsView.addHandlerRender(controlSectionDessertsRender);
  sectionDessertsView.addHandlerSave(controlSaveItem);

  // Drinks section view
  sectionDrinksView.addHandlerRender(controlSectionDrinksRender);
  sectionDrinksView.addHandlerSave(controlSaveItem);

  // Modal view
  itemInfoModalView.addHandlerRender(controlItemInfoModal);
  itemInfoModalView.addHandlerCloseModal(controlModalClose);

  // Saved items panel view
  savedItemsView.addHandlerRender(controlOpenSavedItemsPanel);
  savedItemsView.addHandlerClose(controlCloseSavedItemsPanel);

  // Cart panel view
  miniCartView.addHandlerRender(controlOpenMiniCartPanel);
};
init();
