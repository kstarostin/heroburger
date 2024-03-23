export const truncate = function (str, n) {
  return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
};

export const formatPrice = function (price) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatWeightGramm = function (weight) {
  return new Intl.NumberFormat("en-EN", {
    style: "unit",
    unit: "gram",
  }).format(weight);
};

export const joinCommaSeparated = function (items) {
  return items
    .map((item, index) => {
      if (index !== 0) {
        return item.toLowerCase();
      }
      return item[0].toUpperCase() + item.slice(1).toLowerCase();
    })
    .join(", ");
};

export const extractMinimalItemPrice = function (items) {
  if (!items || items.length === 0) {
    return 0;
  }
  const allPrices = items.map((positionItem) => positionItem.menuPrice);
  return +Math.min(...allPrices);
};

export const getIconNameForItemType = function (itemType) {
  const typeIconMap = new Map();
  typeIconMap.set("burger", "ph-hamburger");
  typeIconMap.set("fingerfood", "ph-popcorn");
  typeIconMap.set("salad", "ph-carrot");
  typeIconMap.set("dessert", "ph-cookie");
  typeIconMap.set("drink", "ph-beer-bottle");

  return typeIconMap.get(itemType);
};

export const getPositionNameForItemType = function (itemType) {
  const typeNameMap = new Map();
  typeNameMap.set("burger", "Hero Burger");
  typeNameMap.set("fingerfood", "Sidekick Fingerfood");
  typeNameMap.set("salad", "Salad");
  typeNameMap.set("dessert", "Dessert");
  typeNameMap.set("drink", "Drink");

  return typeNameMap.get(itemType);
};

export const extractUniquePositionsTypes = function (positionItems) {
  const allTypes = positionItems.map((positionItem) => positionItem.type);
  return allTypes.filter(function (type, index) {
    return allTypes.indexOf(type) === index;
  });
};
