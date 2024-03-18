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
