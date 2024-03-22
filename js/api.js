import { data } from "./data.js";
import {
  MIN_DELIVERY_TIME_MINUTES,
  MAX_DELIVERY_TIME_MINUTES,
} from "./config.js";

// **********************
// API request functions:
// **********************
export const getAllMenus = async function () {
  // imitate response time
  await _sleep(200);
  // execute request
  return _getAllMenusFromData();
};

export const getAllSingleItems = async function () {
  // imitate response time
  await _sleep(300);
  // execute request
  return _getAllSingleItemsFromData();
};

export const getSingleItemsByType = async function (type) {
  // imitate response time
  await _sleep(200);
  // execute request
  return _getAllSingleItemsFromData().filter((item) => item.type === type);
};

export const getAllItems = async function () {
  // imitate response time
  await _sleep(350);
  // execute request
  return _getAllItemsFromData();
};

export const getItemById = async function (id) {
  // imitate response time
  await _sleep(100);
  // execute request
  return _getAllItemsFromData().find((item) => item.id === id);
};

export const getDeliveryTime = async function (deliveryAddress) {
  // imitate response time
  await _sleep(200);
  // execute request
  return _getDeliveryTime();
};

export const placeOrder = async function (cart) {
  // imitate response time
  await _sleep(500);
  // return order
  return cart;
};

// ***********************************
// API response placeholder functions:
// ***********************************
const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      tags: [...menu.tags, ...burger.tags],
      image: burger.image,
      secondPosition: _mapPositionItems(menu.second_position),
      thirdPosition: _mapPositionItems(menu.third_position),
      fourthPosition: _mapPositionItems(menu.fourth_position),
      fifthPosition: _mapPositionItems(menu.fifth_position),
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

const _mapPositionItems = function (positionItemIds) {
  if (!positionItemIds && positionItemIds.length === 0) {
    return [];
  }
  return positionItemIds.map((id) => {
    return _getSingleItemById(id);
  });
};

const _getSingleItemById = function (id) {
  return _getAllSingleItemsFromData().find((item) => item.id === id);
};

const _getDeliveryTime = function () {
  const minCeiled = Math.ceil(MIN_DELIVERY_TIME_MINUTES);
  const maxFloored = Math.floor(MAX_DELIVERY_TIME_MINUTES);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
