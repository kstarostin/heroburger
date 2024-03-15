import { data } from "./data.js";

export const state = {
  cart: {},
  bookmarks: [],
};

export const getMenuItemList = function () {
  const { menus } = data;
  return menus.map((menu) => {
    // find corresponding burger for menu item
    const burger = getBurgersItemList().filter((item) => {
      return item.id === menu.burger_id;
    })[0];
    if (!burger) {
      return {};
    }
    // map data to item
    return {
      id: menu.id,
      name: menu.name,
      description: burger.description,
      ingredients: burger.ingredients,
      price: menu.price,
      new: burger.new,
      tags: [...menu.tags, ...burger.tags],
      image: burger.image,
      fingerfoodIncluded: menu.fingerfood_included,
      fingerfoodId: menu.fingerfood_id,
      saladIncluded: menu.salad_included,
      saladId: menu.salad_id,
      dessertIncluded: menu.dessert_included,
      dessertId: menu.dessert_id,
      drinkIncluded: menu.drink_included,
      drinkId: menu.drink_id,
    };
  });
};

export const getBurgersItemList = function () {
  const { burgers } = data;
  return burgers.map((burger) => {
    // map data to item
    return {
      id: burger.id,
      name: burger.name,
      description: burger.description,
      ingredients: burger.ingredients,
      price: burger.price,
      new: burger.new,
      tags: burger.tags,
      image: burger.image,
    };
  });
};

export const getFingerfoodItemList = function () {
  const { fingerfood } = data;
  return fingerfood.map((item) => {
    // map data to item
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      new: item.new,
      tags: item.tags,
      image: item.image,
    };
  });
};

export const getSaladItemList = function () {
  const { salads } = data;
  return salads.map((salad) => {
    // map data to item
    return {
      id: salad.id,
      name: salad.name,
      description: salad.description,
      ingredients: salad.ingredients,
      price: salad.price,
      new: salad.new,
      tags: salad.tags,
      image: salad.image,
    };
  });
};

export const getDessertItemList = function () {
  const { desserts } = data;
  return desserts.map((dessert) => {
    // map data to item
    return {
      id: dessert.id,
      name: dessert.name,
      description: dessert.description,
      price: dessert.price,
      new: dessert.new,
      tags: dessert.tags,
      image: dessert.image,
    };
  });
};

export const getDrinkItemList = function () {
  const { drinks } = data;
  return drinks.map((drink) => {
    // map data to item
    return {
      id: drink.id,
      name: drink.name,
      description: drink.description,
      price: drink.price,
      new: drink.new,
      tags: drink.tags,
      image: drink.image,
    };
  });
};
