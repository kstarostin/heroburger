import * as api from "./api.js";
import { CART_DELIVERY_COST, CART_FREE_DELIVERY_THRESHOLD } from "./config.js";

export const state = {
  cart: {
    entries: [],
    totalPrice: 0,
    deliveryCost: 0,
    totalCost: 0,
    deliveryAddress: {
      name: "",
      phone: "",
      street: "",
      apartment: "",
      zip: "",
      town: "",
    },
  },
  saved: [],
};

export const addToCart = function (item) {
  const cart = state.cart;

  const cartEntry = createCartEntry(item, cart.entries.length);
  cart.entries.push(cartEntry);

  cart.totalPrice = calculateCartTotalPrice(cart);
  cart.deliveryCost =
    cart.totalPrice >= CART_FREE_DELIVERY_THRESHOLD ? 0 : CART_DELIVERY_COST;
  cart.totalCost = cart.totalPrice + cart.deliveryCost;

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
  cart.deliveryCost =
    cart.totalPrice >= CART_FREE_DELIVERY_THRESHOLD ? 0 : CART_DELIVERY_COST;
  cart.totalCost = cart.totalPrice + cart.deliveryCost;

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

export const saveItem = async function (itemId) {
  state.saved.push(itemId);

  try {
    const item = _updateItemSavedState(await api.getItemById(itemId));
    item.saved = true;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  persistSavedItems();
};

export const unsaveItem = async function (itemId) {
  const index = state.saved.findIndex((id) => id === itemId);
  state.saved.splice(index, 1);

  try {
    const item = _updateItemSavedState(await api.getItemById(itemId));
    item.saved = false;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  persistSavedItems();
};

const persistSavedItems = function () {
  localStorage.setItem("saved", JSON.stringify(state.saved));
};

export const getMenus = async function () {
  try {
    return _updateItemsSavedState(await api.getAllMenus());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return [];
};

export const getAllSingleItems = async function () {
  try {
    return _updateItemsSavedState(await api.getAllSingleItems());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return [];
};

export const getBurgers = async function () {
  return _updateItemsSavedState(await api.getSingleItemsByType("burger"));
};

export const getFingerfood = async function () {
  return _updateItemsSavedState(await api.getSingleItemsByType("fingerfood"));
};

export const getSalads = async function () {
  return _updateItemsSavedState(await api.getSingleItemsByType("salad"));
};

export const getDesserts = async function () {
  return _updateItemsSavedState(await api.getSingleItemsByType("dessert"));
};

export const getDrinks = async function () {
  return _updateItemsSavedState(await api.getSingleItemsByType("drink"));
};

export const getItemList = async function () {
  try {
    return _updateItemsSavedState(await api.getAllItems());
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return [];
};

export const getSavedItems = async function () {
  try {
    return Promise.all(
      state.saved.map(async (id) =>
        _updateItemSavedState(await api.getItemById(id))
      )
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return [];
};

export const getCart = function () {
  return state.cart;
};

export const getItemById = async function (id) {
  try {
    return _updateItemSavedState(await api.getItemById(id));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return [];
};

const _updateItemsSavedState = function (items) {
  return items.map((item) => {
    item.saved = state.saved.some((id) => item.id === id);
    return item;
  });
};

const _updateItemSavedState = function (item) {
  item.saved = state.saved.some((id) => item.id === id);
  return item;
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
