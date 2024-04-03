import * as model from "./model.js";
import sectionHeroView from "./views/sectionHeroView.js";
import sectionMenusView from "./views/sectionMenusView.js";
import sectionBurgersView from "./views/sectionBurgersView.js";
import sectionFingerfoodView from "./views/sectionFingerfoodView.js";
import sectionSaladsView from "./views/sectionSaladsView.js";
import sectionDessertsView from "./views/sectionDessertsView.js";
import sectionDrinksView from "./views/sectionDrinksView.js";
import headerNavLinkView from "./views/headerNavLinkView.js";
import footerView from "./views/footerView.js";
import itemInfoModalView from "./views/itemInfoModalView.js";
import menuConfiguratorModalView from "./views/menuConfiguratorModalView.js";
import checkoutModalView from "./views/checkoutModalView.js";
import orderPlacedModalView from "./views/orderPlacedModalView.js";
import loaderModalView from "./views/loaderModalView.js";
import savedItemsView from "./views/savedItemsView.js";
import miniCartView from "./views/miniCartView.js";
import { calculateSumPrice } from "./helpers.js";
import { GITHUB_URL } from "./config.js";

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

/**
 * Controls rendering of the hero section.
 */
const controlSectionHeroRender = function () {
  const currentMonth = new Date().toLocaleString("en", { month: "long" });
  sectionHeroView.render(currentMonth);
};

/**
 * Controls rendering of the menus section.
 */
const controlSectionMenusRender = async function () {
  try {
    sectionMenusView.render(await model.getMenus());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls rendering of the burgers section.
 */
const controlSectionBurgersRender = async function () {
  try {
    sectionBurgersView.render(await model.getBurgers());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls rendering of the fingerfood section.
 */
const controlSectionFingerfoodRender = async function () {
  try {
    sectionFingerfoodView.render(await model.getFingerfood());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls rendering of the salads section.
 */
const controlSectionSaladsRender = async function () {
  try {
    sectionSaladsView.render(await model.getSalads());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls rendering of the desserts section.
 */
const controlSectionDessertsRender = async function () {
  try {
    sectionDessertsView.render(await model.getDesserts());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls rendering of the drinks section.
 */
const controlSectionDrinksRender = async function () {
  try {
    sectionDrinksView.render(await model.getDrinks());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls rendering of the footer.
 */
const controlFooterRender = function () {
  const currentYear = new Date().getFullYear();

  footerView.render({
    currentYear: currentYear,
    linkUrl: GITHUB_URL,
  });
};

/**
 * Controls scrolling for the navigation links.
 */
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

/**
 * Controls displaying of the mobile navigation menu.
 */
const controlMobileNavToggle = function (headerEl) {
  headerEl.classList.toggle("nav-open");
};

/**
 * Controls closing of the modal window.
 */
const controlModalClose = function () {
  itemInfoModalView.close();
};

/**
 * Controls opening of the item info modal window.
 */
const controlItemInfoModal = async function (itemId) {
  try {
    const item = await model.getItemById(itemId);
    itemInfoModalView.open();
    itemInfoModalView.render(item);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls saving an item.
 */
const controlSaveItem = async function (view, itemId) {
  try {
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
    // update favorites list icon
    headerNavLinkView.changeSavedItemsIcon(model.state.saved.length !== 0);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls add to cart operation.
 */
const controlAddToCart = async function (itemId) {
  try {
    // fetch the item
    const item = await model.getItemById(itemId);
    // perform add to cart operation
    model.addToCart(item);
    // open cart panel
    controlOpenMiniCartPanel();
    // update cart icon
    headerNavLinkView.changeCartIcon(model.state.cart.entries.length !== 0);
    headerNavLinkView.setCartIconCounter(model.state.cart.entries.length);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls opening of the menu configurator modal window.
 */
const controlConfigureMenu = async function (itemId) {
  try {
    const menuItem = await model.getItemById(itemId);

    menuConfiguratorModalView.open();
    menuConfiguratorModalView.render({
      menuItem: menuItem,
      firstPosition: menuItem.firstPosition,
      secondPosition: menuItem.secondPosition,
      thirdPosition: menuItem.thirdPosition,
      fourthPosition: menuItem.fourthPosition,
      fifthPosition: menuItem.fifthPosition,
    });
    menuConfiguratorModalView.addListenerSelectPositionItem(
      controlSelectPositionItem
    );
    menuConfiguratorModalView.addHandlerConfirmConfiguration(
      controlAddToCartMenuItem
    );

    // set total price for initial configuration
    const menuPrices = [
      menuItem.price,
      menuItem.secondPosition && menuItem.secondPosition.length > 0
        ? menuItem.secondPosition[0].menuPrice
        : 0,
      menuItem.thirdPosition && menuItem.thirdPosition.length > 0
        ? menuItem.thirdPosition[0].menuPrice
        : 0,
      menuItem.fourthPosition && menuItem.fourthPosition.length > 0
        ? menuItem.fourthPosition[0].menuPrice
        : 0,
      menuItem.fifthPosition && menuItem.fifthPosition.length > 0
        ? menuItem.fifthPosition[0].menuPrice
        : 0,
    ];
    menuConfiguratorModalView.adjustConfigurationPrice(
      calculateSumPrice(menuPrices)
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls recalculation of the total price for configured menu item.
 */
const controlSelectPositionItem = async function (itemId) {
  try {
    const configuratorData =
      menuConfiguratorModalView.selectPositionItem(itemId);

    // collect configured items
    const headerItem = await model.getItemById(configuratorData.menuId);
    const childItems = await getConfiguredChildItems(configuratorData);

    // extract menu prices for configured items
    const menuPrices = [
      headerItem.price,
      ...childItems.map((item) => item.menuPrice),
    ];
    // set total price for adjusted configuration
    menuConfiguratorModalView.adjustConfigurationPrice(
      calculateSumPrice(menuPrices)
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls adding configured menu item to the cart.
 */
const controlAddToCartMenuItem = async function (configuratorData) {
  try {
    // close configurator modal
    menuConfiguratorModalView.close();
    // show loading spinner
    loaderModalView.render();
    // collect configured items
    const headerItem = await model.getItemById(configuratorData.menuId);
    const childItems = await getConfiguredChildItems(configuratorData);
    // perform add to cart operation
    model.addToCart(headerItem, childItems);
    // hide loading spinner
    loaderModalView.clear();
    // render cart panel
    controlOpenMiniCartPanel();
    // update cart icon
    headerNavLinkView.changeCartIcon(model.state.cart.entries.length !== 0);
    headerNavLinkView.setCartIconCounter(model.state.cart.entries.length);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const getConfiguredChildItems = async function (configuratorData) {
  try {
    const secondPositionItem = configuratorData.secondPosition
      ? await model.getItemById(configuratorData.secondPosition)
      : null;
    const thirdPositionItem = configuratorData.thirdPosition
      ? await model.getItemById(configuratorData.thirdPosition)
      : null;
    const fourthPositionItem = configuratorData.fourthPosition
      ? await model.getItemById(configuratorData.fourthPosition)
      : null;
    const fifthPositionItem = configuratorData.fifthPosition
      ? await model.getItemById(configuratorData.fifthPosition)
      : null;

    return [
      ...(secondPositionItem ? [secondPositionItem] : []),
      ...(thirdPositionItem ? [thirdPositionItem] : []),
      ...(fourthPositionItem ? [fourthPositionItem] : []),
      ...(fifthPositionItem ? [fifthPositionItem] : []),
    ];
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls opening of the saved items modal window.
 */
const controlOpenSavedItemsPanel = async function () {
  try {
    savedItemsView.render(await model.getSavedItems());

    savedItemsView.addHandlerClose(controlCloseSavedItemsPanel);

    savedItemsView.addHandlerNavigateItem(controlNavigateSavedItem);
    savedItemsView.addHandlerRemoveItem(controlRemoveSavedItem);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls closing saved items modal window.
 */
const controlCloseSavedItemsPanel = function () {
  savedItemsView.hide();
};

/**
 * Controls auto-scrolling to the saved item.
 */
const controlNavigateSavedItem = function (id) {
  controlCloseSavedItemsPanel();
  scrollToElement(`#${id}`);
};

/**
 * Controls removing item from the saved list.
 */
const controlRemoveSavedItem = async function (id) {
  try {
    // load item
    const item = await model.getItemById(id);
    // remove item from saved list
    await model.unsaveItem(item.id);
    // re-render saved items panel
    controlOpenSavedItemsPanel();
    // update sections view
    getSectionItemsViewByType(item.type).update(await model.getItemList());
    // update favorites list icon
    headerNavLinkView.changeSavedItemsIcon(model.state.saved.length !== 0);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

/**
 * Controls opening of the cart modal window.
 */
const controlOpenMiniCartPanel = function () {
  miniCartView.render(model.getCart());

  miniCartView.addHandlerClose(controlCloseMiniCartPanel);

  miniCartView.addHandlerRemoveCartEntry(controlRemoveCartEntry);
  miniCartView.addHandlerCheckoutModal(controlCheckoutModal);
};

/**
 * Controls closing cart modal window.
 */
const controlCloseMiniCartPanel = function () {
  miniCartView.hide();
};

/**
 * Controls removing cart entry.
 */
const controlRemoveCartEntry = function (entryNumber) {
  // remove entry from the state
  model.removeCartEntry(entryNumber);
  // re-render cart panel
  controlOpenMiniCartPanel();
  // update cart icon
  headerNavLinkView.changeCartIcon(model.state.cart.entries.length !== 0);
  headerNavLinkView.setCartIconCounter(model.state.cart.entries.length);
};

/**
 * Controls opening of the checkout modal window.
 */
const controlCheckoutModal = function () {
  miniCartView.hide();
  checkoutModalView.open();
  checkoutModalView.render({ cart: model.getCart(), invalidFields: [] });
  checkoutModalView.addHandlerPlaceOrder(controlPlaceOrder);
};

/**
 * Controls placing order. Additionally, performs validation and re-creates an empty cart.
 */
const controlPlaceOrder = async function (addressData) {
  try {
    // close checkout modal
    checkoutModalView.close();
    // show loading spinner
    loaderModalView.render();
    // populate submitted address
    const cart = model.getCart();
    const deliveryAddress = model.createAddress(addressData);
    cart.deliveryAddress = deliveryAddress;
    // validate address
    const invalidFields = await model.validateDeliveryAddress(deliveryAddress);
    if (invalidFields && invalidFields.length > 0) {
      checkoutModalView.open();
      checkoutModalView.render({ cart: cart, invalidFields: invalidFields });
      checkoutModalView.addHandlerPlaceOrder(controlPlaceOrder);
      return;
    }
    // calculate delivery time
    cart.deliveryTime = await model.calculateDeliveryTimeMinutes(
      deliveryAddress
    );
    // place order
    const order = await model.placeOrder(cart);
    // hide loading spinner
    loaderModalView.clear();
    // show order placed modal
    orderPlacedModalView.open();
    orderPlacedModalView.render(order);
    // create new empty cart
    model.createCart(
      cart.deliveryAddress.saved ? cart.deliveryAddress : undefined
    );
    // update cart icon
    headerNavLinkView.changeCartIcon(model.state.cart.entries.length !== 0);
    headerNavLinkView.setCartIconCounter(model.state.cart.entries.length);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const getSectionItemsViewByType = function (type) {
  return sectionItemsViewList.find((view) => view._itemType === type);
};

/**
 * The main function for populating the page content and assigning additional handlers.
 */
const init = function () {
  // Header view
  headerNavLinkView.addHandlerNavigateToSections(controlNavLinks);
  headerNavLinkView.addHandlerMobileNav(controlMobileNavToggle);
  headerNavLinkView.changeSavedItemsIcon(model.state.saved.length !== 0);
  headerNavLinkView.changeCartIcon(model.state.cart.entries.length !== 0);
  headerNavLinkView.setCartIconCounter(model.state.cart.entries.length);

  // Hero view
  sectionHeroView.addHandlerRender(controlSectionHeroRender);
  sectionHeroView.addHandlerNavigateToItems(controlNavLinks);

  // Menus section view
  sectionMenusView.addHandlerRender(controlSectionMenusRender);
  sectionMenusView.addHandlerSave(controlSaveItem);
  sectionMenusView.addHandlerAddToCart(controlConfigureMenu);
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

  // Footer view
  footerView.addHandlerRender(controlFooterRender);

  // Modal view
  itemInfoModalView.addHandlerCloseModal(controlModalClose);

  // Saved items panel view
  savedItemsView.addHandlerRender(controlOpenSavedItemsPanel);

  // Cart panel view
  miniCartView.addHandlerRender(controlOpenMiniCartPanel);
};
init();
