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

const controlSectionMenusRender = async function () {
  sectionMenusView.render(await model.getMenus());
};

const controlSectionBurgersRender = async function () {
  sectionBurgersView.render(await model.getBurgers());
};

const controlSectionFingerfoodRender = async function () {
  sectionFingerfoodView.render(await model.getFingerfood());
};

const controlSectionSaladsRender = async function () {
  sectionSaladsView.render(await model.getSalads());
};

const controlSectionDessertsRender = async function () {
  sectionDessertsView.render(await model.getDesserts());
};

const controlSectionDrinksRender = async function () {
  sectionDrinksView.render(await model.getDrinks());
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

const controlModalClose = function () {
  itemInfoModalView.close();
};

const controlItemInfoModal = async function (itemId) {
  const item = await model.getItemById(itemId);
  itemInfoModalView.open();
  console.log(item);
  itemInfoModalView.render(item);
};

const controlSaveItem = async function (view, itemId) {
  // save/unsave item
  if (
    model.state.saved.length === 0 ||
    !model.state.saved.some((id) => itemId === id)
  ) {
    await model.saveItem(itemId);
  } else {
    await model.unsaveItem(itemId);
  }

  // update view
  view.update(await model.getItemList());
};

const controlAddToCart = async function (itemId) {
  const item = await model.getItemById(itemId);
  model.addToCart(item);
  // render cart panel
  controlOpenMiniCartPanel();
};

const controlOpenSavedItemsPanel = async function () {
  savedItemsView.render(await model.getSavedItems());

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

const controlRemoveSavedItem = async function (id) {
  // load item
  const item = await model.getItemById(id);
  // remove item from saved list
  await model.unsaveItem(item.id);
  // re-render saved items panel
  controlOpenSavedItemsPanel();
  // update sections view
  getSectionItemsViewByType(item.type).update(await model.getItemList());
};

const controlOpenMiniCartPanel = function () {
  miniCartView.render(model.getCart());

  miniCartView.addHandlerRemoveCartEntry(controlRemoveCartEntry);
};

const controlCloseMiniCartPanel = function () {
  miniCartView.hide();
};

const controlRemoveCartEntry = function (entryNumber) {
  // remove entry from the state
  model.removeCartEntry(entryNumber);
  // re-render cart panel
  controlOpenMiniCartPanel();
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
  sectionMenusView.addHandlerOpenModalInfo(controlItemInfoModal);

  // Burgers section view
  sectionBurgersView.addHandlerRender(controlSectionBurgersRender);
  sectionBurgersView.addHandlerSave(controlSaveItem);
  sectionBurgersView.addHandlerAddToCart(controlAddToCart);
  sectionBurgersView.addHandlerOpenModalInfo(controlItemInfoModal);

  // Fingerfood section view
  sectionFingerfoodView.addHandlerRender(controlSectionFingerfoodRender);
  sectionFingerfoodView.addHandlerSave(controlSaveItem);
  sectionFingerfoodView.addHandlerAddToCart(controlAddToCart);
  sectionFingerfoodView.addHandlerOpenModalInfo(controlItemInfoModal);

  // Salads section view
  sectionSaladsView.addHandlerRender(controlSectionSaladsRender);
  sectionSaladsView.addHandlerSave(controlSaveItem);
  sectionSaladsView.addHandlerAddToCart(controlAddToCart);
  sectionSaladsView.addHandlerOpenModalInfo(controlItemInfoModal);

  // Desserts section view
  sectionDessertsView.addHandlerRender(controlSectionDessertsRender);
  sectionDessertsView.addHandlerSave(controlSaveItem);
  sectionDessertsView.addHandlerAddToCart(controlAddToCart);
  sectionDessertsView.addHandlerOpenModalInfo(controlItemInfoModal);

  // Drinks section view
  sectionDrinksView.addHandlerRender(controlSectionDrinksRender);
  sectionDrinksView.addHandlerSave(controlSaveItem);
  sectionDrinksView.addHandlerAddToCart(controlAddToCart);
  sectionDrinksView.addHandlerOpenModalInfo(controlItemInfoModal);

  // Modal view
  itemInfoModalView.addHandlerCloseModal(controlModalClose);

  // Saved items panel view
  savedItemsView.addHandlerRender(controlOpenSavedItemsPanel);
  savedItemsView.addHandlerClose(controlCloseSavedItemsPanel);

  // Cart panel view
  miniCartView.addHandlerRender(controlOpenMiniCartPanel);
  miniCartView.addHandlerClose(controlCloseMiniCartPanel);
};
init();
