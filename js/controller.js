import * as model from "./model.js";
import sectionMenusView from "./views/sectionMenusView.js";
import sectionBurgersView from "./views/sectionBurgersView.js";
import sectionFingerfoodView from "./views/sectionFingerfoodView.js";
import sectionSaladsView from "./views/sectionSaladsView.js";
import sectionDessertsView from "./views/sectionDessertsView.js";
import sectionDrinksView from "./views/sectionDrinksView.js";

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

const init = function () {
  sectionMenusView.render(model.getMenuItemList());
  sectionBurgersView.render(model.getBurgersItemList());
  sectionFingerfoodView.render(model.getFingerfoodItemList());
  sectionSaladsView.render(model.getSaladItemList());
  sectionDessertsView.render(model.getDessertItemList());
  sectionDrinksView.render(model.getDrinkItemList());
};
init();
