import { data } from "./data.js";
import {
  MIN_DELIVERY_TIME_MINUTES,
  MAX_DELIVERY_TIME_MINUTES,
} from "./config.js";
import * as validator from "./validator.js";

// **********************
// API request functions:
// **********************
export const getAllMenus = async function () {
  // imitate response time
  try {
    await _sleep(300);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return _getAllMenusFromData();
};

export const getAllSingleItems = async function () {
  // imitate response time
  try {
    await _sleep(400);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return _getAllSingleItemsFromData();
};

export const getSingleItemsByType = async function (type) {
  // imitate response time
  try {
    await _sleep(300);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return _getAllSingleItemsFromData().filter((item) => item.type === type);
};

export const getAllItems = async function () {
  // imitate response time
  try {
    await _sleep(450);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return _getAllItemsFromData();
};

export const getItemById = async function (id) {
  // imitate response time
  try {
    await _sleep(100);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return _getAllItemsFromData().find((item) => item.id === id);
};

export const validateDeliveryAddress = async function (deliveryAddress) {
  // imitate response time
  try {
    await _sleep(400);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return validator.validateDeliveryAddress(deliveryAddress);
};

export const getDeliveryTime = async function (deliveryAddress) {
  // imitate response time
  try {
    await _sleep(500);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // execute request
  return _getDeliveryTime();
};

export const placeOrder = async function (cart) {
  // imitate response time
  try {
    await _sleep(800);
  } catch (error) {
    console.error(`Error while waiting for the response: ${error}`);
    throw error;
  }
  // return order
  return cart;
};

// ***********************************
// API response placeholder functions:
// ***********************************
const _sleep = (ms) => {
  const min = ms - ms * 0.25;
  const max = ms + ms * 0.25;
  const randomDelayMs = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, randomDelayMs));
};

const _getAllItemsFromData = function () {
  return [..._getAllMenusFromData(), ..._getAllSingleItemsFromData()];
};

const _getAllMenusFromData = function () {
  const { menus } = data;
  return menus.map((menu) => {
    // find corresponding burger for menu item
    const burger = _getSingleItemById(menu.burger_id);
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
      tags: [...menu.tags, ...burger.tags.filter((tag) => tag !== "burger")],
      image: burger.image,
      firstPosition: [burger],
      secondPosition: _mapPosition(menu.second_position),
      thirdPosition: _mapPosition(menu.third_position),
      fourthPosition: _mapPosition(menu.fourth_position),
      fifthPosition: _mapPosition(menu.fifth_position),
    };
  });
};

const _getAllSingleItemsFromData = function () {
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

const _mapPosition = function (position) {
  if (!position || !position.items || position.items.length === 0) {
    return undefined;
  }
  return {
    optional: position.optional,
    items: position.items.map((id) => {
      return _getSingleItemById(id);
    }),
  };
};

const _getSingleItemById = function (id) {
  return _getAllSingleItemsFromData().find((item) => item.id === id);
};

const _getDeliveryTime = function () {
  const minCeiled = Math.ceil(MIN_DELIVERY_TIME_MINUTES);
  const maxFloored = Math.floor(MAX_DELIVERY_TIME_MINUTES);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
