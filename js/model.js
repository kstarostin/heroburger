import { data } from "./data.js";

export const state = {
  cart: {},
  bookmarks: [],
};

export const getMenus = function () {
  const { menus } = data;
  return menus.map((menu) => {
    // find corresponding burger for menu item
    const burger = _getBurgerById(menu.burger_id);
    if (!burger) {
      return {};
    }
    // map rest data to item
    return {
      id: menu.id,
      name: menu.name,
      description: burger.description,
      ingredients: burger.ingredients,
      price: burger.menuPrice,
      new: burger.new,
      tags: [...menu.tags, ...burger.tags],
      image: burger.image,
      secondPosition: _mapPositionItems(menu.second_position),
      thirdPosition: _mapPositionItems(menu.third_position),
      fourthPosition: _mapPositionItems(menu.fourth_position),
      fifthPosition: _mapPositionItems(menu.fifth_position),
    };
  });
};

export const getAllItems = function () {
  const { items } = data;
  return items.map((item) => {
    // map item data to item model
    return {
      id: item.id,
      type: item.type,
      name: item.name,
      description: item.description,
      ingredients: item.ingredients,
      price: item.price,
      menuPrice: item.menu_price,
      new: item.new,
      tags: item.tags,
      image: item.image,
      weightGramm: item.weight,
      nutrientsPortion: item.nutrients_per_portion,
    };
  });
};

export const getBurgers = function () {
  return getAllItems().filter((item) => item.type === "burger");
};

export const getFingerfood = function () {
  return getAllItems().filter((item) => item.type === "fingerfood");
};

export const getSalads = function () {
  return getAllItems().filter((item) => item.type === "salad");
};

export const getDesserts = function () {
  return getAllItems().filter((item) => item.type === "dessert");
};

export const getDrinks = function () {
  return getAllItems().filter((item) => item.type === "drink");
};

export const getItemList = function () {
  return [...getMenus(), ...getAllItems()];
};

const _mapPositionItems = function (positionItemIds) {
  if (!positionItemIds && positionItemIds.length === 0) {
    return [];
  }
  return positionItemIds.map((id) => {
    return _getItemById(id);
  });
};

const _getItemById = function (id) {
  return getAllItems().find((item) => item.id === id);
};

const _getBurgerById = function (id) {
  return getBurgers().find((item) => item.id === id);
};
