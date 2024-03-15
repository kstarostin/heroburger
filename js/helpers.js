export const truncate = function (str, n) {
  return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
};

export const formatPrice = function (price) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
