import { data } from "./data.js";

export const state = {
  cart: {
    entries: [],
    totalPrice: 0,
  },
  saved: [],
};

export const addToCart = function (item) {
  const cart = state.cart;

  const cartEntry = createCartEntry(item, cart.entries.length);
  cart.entries.push(cartEntry);
  cart.totalPrice = calculateCartTotalPrice(cart);

  state.cart = cart;
  persistCart();
};

export const removeCartEntry = function (entryNumber) {
  const cart = state.cart;

  const index = cart.entries.findIndex(
    (entry) => entry.entryNumber === +entryNumber
  );
  cart.entries.splice(index, 1);

  cart.totalPrice = calculateCartTotalPrice(cart);

  persistCart();
};

const createCartEntry = function (item, entryNumber) {
  return {
    entryNumber: entryNumber,
    item: item,
    price: item.price,
  };
};

const calculateCartTotalPrice = function (cart) {
  const total = cart.entries
    .map((entry) => entry.price)
    .reduce((partialSum, a) => partialSum + a, 0);
  return total;
};

const persistCart = function () {
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const saveItem = function (itemId) {
  state.saved.push(itemId);

  const item = getItemById(itemId);
  item.saved = true;

  persistSavedItems();
};

export const unsaveItem = function (itemId) {
  const index = state.saved.findIndex((id) => id === itemId);
  state.saved.splice(index, 1);

  const item = getItemById(itemId);
  item.saved = false;

  persistSavedItems();
};

const persistSavedItems = function () {
  localStorage.setItem("saved", JSON.stringify(state.saved));
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
      type: "menu",
      name: menu.name,
      description: burger.description,
      ingredients: burger.ingredients,
      price: burger.menuPrice,
      new: burger.new,
      saved: state.saved.some((id) => menu.id === id),
      tags: [...menu.tags, ...burger.tags],
      image: burger.image,
      secondPosition: _mapPositionItems(menu.second_position),
      thirdPosition: _mapPositionItems(menu.third_position),
      fourthPosition: _mapPositionItems(menu.fourth_position),
      fifthPosition: _mapPositionItems(menu.fifth_position),
    };
  });
};

export const getAllSingleItems = function () {
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
      saved: state.saved.some((id) => item.id === id),
      tags: item.tags,
      image: item.image,
      weightGramm: item.weight,
      nutrientsPortion: item.nutrients_per_portion,
    };
  });
};

export const getBurgers = function () {
  return getAllSingleItems().filter((item) => item.type === "burger");
};

export const getFingerfood = function () {
  return getAllSingleItems().filter((item) => item.type === "fingerfood");
};

export const getSalads = function () {
  return getAllSingleItems().filter((item) => item.type === "salad");
};

export const getDesserts = function () {
  return getAllSingleItems().filter((item) => item.type === "dessert");
};

export const getDrinks = function () {
  return getAllSingleItems().filter((item) => item.type === "drink");
};

export const getItemList = function () {
  return [...getMenus(), ...getAllSingleItems()];
};

export const getSavedItems = function () {
  return state.saved.map((id) => getItemById(id));
};

export const getCart = function () {
  return state.cart;
};

export const getItemById = function (id) {
  return getItemList().find((item) => item.id === id);
};

const _mapPositionItems = function (positionItemIds) {
  if (!positionItemIds && positionItemIds.length === 0) {
    return [];
  }
  return positionItemIds.map((id) => {
    return _getSingleItemById(id);
  });
};

const _getSingleItemById = function (id) {
  return getAllSingleItems().find((item) => item.id === id);
};

const _getBurgerById = function (id) {
  return getBurgers().find((item) => item.id === id);
};

const initState = function () {
  const saved = localStorage.getItem("saved");
  if (saved) {
    state.saved = JSON.parse(saved);
  }
  const cart = localStorage.getItem("cart");
  if (cart) {
    state.cart = JSON.parse(cart);
  }
};
initState();
