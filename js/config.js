export const CART_DELIVERY_COST = 5;
export const CART_FREE_DELIVERY_THRESHOLD = 25;
export const MIN_DELIVERY_TIME_MINUTES = 15;
export const MAX_DELIVERY_TIME_MINUTES = 60;

// Validation patterns
export const FORM_PATTERN_NAME = "^[a-zA-Z\\u0080-\\u024F\\s]{2,64}$";
export const FORM_PATTERN_PHONE =
  "^(\\+\\d{1,2}\\s?)?\\(?\\d{3,4}\\)?[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{4}$";
export const FORM_PATTERN_STREET = "[a-zA-Z\\s\\d\\-\\,\\.]{5,64}";
export const FORM_PATTERN_APARTMENT = "[a-zA-Z0-9\\s\\-\\/\\.]{0,16}";
export const FORM_PATTERN_ZIP = "\\d{5}";
export const FORM_PATTERN_TOWN =
  "^([\\Da-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[\\Da-zA-Z\\u0080-\\u024F]{2,32}$";
