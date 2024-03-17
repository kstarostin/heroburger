export const truncate = function (str, n) {
  return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
};

export const formatPrice = function (price) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
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
