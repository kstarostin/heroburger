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

const controlNavLinks = function (headerEl, link, event) {
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
  if (
    link.classList.contains("main-nav-link") ||
    link.classList.contains("btn-header-action")
  ) {
    controlMobileNavToggle(headerEl);
  }
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

  // render saved view
  // savedView.render(model.state.saved);
};

const init = function () {
  sectionMenusView.render(model.getMenus());
  sectionMenusView.addHandlerSave(controlSaveItem);

  sectionBurgersView.render(model.getBurgers());
  sectionBurgersView.addHandlerSave(controlSaveItem);

  sectionFingerfoodView.render(model.getFingerfood());
  sectionFingerfoodView.addHandlerSave(controlSaveItem);

  sectionSaladsView.render(model.getSalads());
  sectionSaladsView.addHandlerSave(controlSaveItem);

  sectionDessertsView.render(model.getDesserts());
  sectionDessertsView.addHandlerSave(controlSaveItem);

  sectionDrinksView.render(model.getDrinks());
  sectionDrinksView.addHandlerSave(controlSaveItem);

  headerNavLinkView.addHandlerNavigateToSections(controlNavLinks);
  headerNavLinkView.addHandlerMobileNav(controlMobileNavToggle);
  sectionHeroView.addHandlerNavigateToItems(controlNavLinks);

  itemInfoModalView.addHandlerRender(controlItemInfoModal);
  itemInfoModalView.addHandlerCloseModal(controlModalClose);
};
init();
