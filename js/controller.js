import * as model from "./model.js";
import sectionMenusView from "./views/sectionMenusView.js";
import sectionBurgersView from "./views/sectionBurgersView.js";
import sectionFingerfoodView from "./views/sectionFingerfoodView.js";
import sectionSaladsView from "./views/sectionSaladsView.js";
import sectionDessertsView from "./views/sectionDessertsView.js";
import sectionDrinksView from "./views/sectionDrinksView.js";
import headerNavLinkView from "./views/headerNavLinkView.js";
import sectionHeroView from "./views/sectionHeroView.js";
import itemInfoModalView from "./views/itemInfoModalView.js";

const sectionHeroElement = document.querySelector(".section-hero");
const heroMonthElement = document.querySelector("#hero-month");

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

// Set current month in the hero header
window.onload = () => {
  const currentMonth = new Date().toLocaleString("en", { month: "long" });
  heroMonthElement.textContent = currentMonth;
};

const controlNavLinks = function (link, event) {
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
    const sectionEl = document.querySelector(href);
    if (!sectionEl) {
      return;
    }
    sectionEl.scrollIntoView({
      behavior: "smooth",
    });
  }
  // close mobile nav
  // if (link.classList.contains("main-nav-link")) {
  //   headerEl.classList.toggle("nav-open");
  // }
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

const init = function () {
  sectionMenusView.render(model.getMenuItemList());
  sectionBurgersView.render(model.getBurgersItemList());
  sectionFingerfoodView.render(model.getFingerfoodItemList());
  sectionSaladsView.render(model.getSaladItemList());
  sectionDessertsView.render(model.getDessertItemList());
  sectionDrinksView.render(model.getDrinkItemList());

  headerNavLinkView.addHandlerNavigateToSections(controlNavLinks);
  sectionHeroView.addHandlerNavigateToItems(controlNavLinks);

  itemInfoModalView.addHandlerRender(controlItemInfoModal);
  itemInfoModalView.addHandlerCloseModal(controlModalClose);
};
init();
