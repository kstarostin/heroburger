import * as api from "./api.js";
import { CART_DELIVERY_COST, CART_FREE_DELIVERY_THRESHOLD } from "./config.js";

export const state = {
  cart: {},
  saved: [],
};

export const createCart = function (deliveryAddress) {
  const cart = {
    entries: [],
    totalPrice: 0,
    deliveryCost: 0,
    totalCost: 0,
    deliveryAddress: deliveryAddress ? deliveryAddress : createAddress(),
  };
  state.cart = cart;
  _persistCart();
  return cart;
};

export const createAddress = function (addressData) {
  return {
    name: addressData ? addressData.name : "",
    phone: addressData ? addressData.phone : "",
    street: addressData ? addressData.street : "",
    apartment: addressData ? addressData.apartment : "",
    zip: addressData ? addressData.zip : "",
    town: addressData ? addressData.town : "",
    saved: addressData && addressData.saved ? true : false,
  };
};

export const addToCart = function (headerItem, childItems = []) {
  const cart = state.cart;

  const cartEntry = _createCartEntry(
    headerItem,
    cart.entries.length,
    childItems
  );
  cart.entries.push(cartEntry);

  cart.totalPrice = calculateCartTotalPrice(cart);
  cart.deliveryCost =
    cart.totalPrice >= CART_FREE_DELIVERY_THRESHOLD ? 0 : CART_DELIVERY_COST;
  cart.totalCost = cart.totalPrice + cart.deliveryCost;

  state.cart = cart;
  _persistCart();
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

  _persistCart();
};

export const validateDeliveryAddress = async function (deliveryAddress) {
  try {
    return await api.validateDeliveryAddress(deliveryAddress);
  } catch (error) {
    console.error(`Error on delivery address validation: ${error}`);
  }
  return [];
};

export const calculateDeliveryTimeMinutes = async function (deliveryAddress) {
  try {
    return await api.getDeliveryTime(deliveryAddress);
  } catch (error) {
    console.error(`Can't calculate delivery time: ${error}`);
  }
  return -1;
};

export const placeOrder = async function (cart) {
  try {
    return await api.placeOrder(cart);
  } catch (error) {
    console.error(`Can't place order: ${error}`);
  }
  return {};
};

const calculateCartTotalPrice = function (cart) {
  const total = cart.entries
    .map((entry) => entry.price)
    .reduce((partialSum, a) => partialSum + a, 0);
  return total;
};

export const saveItem = async function (itemId) {
  state.saved.push(itemId);

  try {
    const item = _updateItemSavedState(await api.getItemById(itemId));
    item.saved = true;
  } catch (error) {
    console.error(`Can't save item with id: ${itemId}`);
  }
  _persistSavedItems();
};

export const unsaveItem = async function (itemId) {
  const index = state.saved.findIndex((id) => id === itemId);
  state.saved.splice(index, 1);

  try {
    const item = _updateItemSavedState(await api.getItemById(itemId));
    item.saved = false;
  } catch (error) {
    console.error(`Can't unsave item with id: ${itemId}`);
  }
  _persistSavedItems();
};

export const getMenus = async function () {
  try {
    return _updateItemsSavedState(await api.getAllMenus());
  } catch (error) {
    console.error("Can't fetch all menus");
  }
  return [];
};

export const getAllSingleItems = async function () {
  try {
    return _updateItemsSavedState(await api.getAllSingleItems());
  } catch (error) {
    console.error("Can't fetch all single items");
  }
  return [];
};

export const getBurgers = async function () {
  try {
    return _updateItemsSavedState(await api.getSingleItemsByType("burger"));
  } catch (error) {
    console.error("Can't fetch burger items");
  }
  return [];
};

export const getFingerfood = async function () {
  try {
    return _updateItemsSavedState(await api.getSingleItemsByType("fingerfood"));
  } catch (error) {
    console.error("Can't fetch fingerfood items");
  }
  return [];
};

export const getSalads = async function () {
  try {
    return _updateItemsSavedState(await api.getSingleItemsByType("salad"));
  } catch (error) {
    console.error("Can't fetch salad items");
  }
  return [];
};

export const getDesserts = async function () {
  try {
    return _updateItemsSavedState(await api.getSingleItemsByType("dessert"));
  } catch (error) {
    console.error("Can't fetch dessert items");
  }
  return [];
};

export const getDrinks = async function () {
  try {
    return _updateItemsSavedState(await api.getSingleItemsByType("drink"));
  } catch (error) {
    console.error("Can't fetch drinks");
  }
  return [];
};

export const getItemList = async function () {
  try {
    return _updateItemsSavedState(await api.getAllItems());
  } catch (error) {
    console.error("Can't fetch all items");
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
    console.error("Can't fetch saved items");
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
    console.error(`Can't fetch an item by id: ${id}`);
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

const _createCartEntry = function (item, entryNumber, childItems = []) {
  return {
    entryNumber: entryNumber,
    item: item,
    childEntries:
      childItems.length === 0
        ? []
        : childItems.map((childItem, index) =>
            _createCartEntry(childItem, index)
          ),
    price:
      childItems.length === 0
        ? item.price
        : item.price +
          childItems.reduce((sum, item) => sum + item.menuPrice, 0),
  };
};

const _persistCart = function () {
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

const _persistSavedItems = function () {
  localStorage.setItem("saved", JSON.stringify(state.saved));
};

const initState = function () {
  const saved = localStorage.getItem("saved");
  if (saved) {
    state.saved = JSON.parse(saved);
  }
  const cart = localStorage.getItem("cart");
  state.cart = cart ? JSON.parse(cart) : createCart();
};
initState();
