import {
  FORM_PATTERN_NAME,
  FORM_PATTERN_PHONE,
  FORM_PATTERN_STREET,
  FORM_PATTERN_APARTMENT,
  FORM_PATTERN_ZIP,
  FORM_PATTERN_TOWN,
} from "./config.js";

export const validateDeliveryAddress = function (deliveryAddress) {
  const invalidFields = [];

  if (!validateParameter(deliveryAddress.name, FORM_PATTERN_NAME)) {
    invalidFields.push("name");
  }
  if (!validateParameter(deliveryAddress.phone, FORM_PATTERN_PHONE)) {
    invalidFields.push("phone");
  }
  if (!validateParameter(deliveryAddress.street, FORM_PATTERN_STREET)) {
    invalidFields.push("street");
  }
  if (!validateParameter(deliveryAddress.apartment, FORM_PATTERN_APARTMENT)) {
    invalidFields.push("apartment");
  }
  if (!validateParameter(deliveryAddress.zip, FORM_PATTERN_ZIP)) {
    invalidFields.push("zip");
  }
  if (!validateParameter(deliveryAddress.town, FORM_PATTERN_TOWN)) {
    invalidFields.push("town");
  }
  return invalidFields;
};

const validateParameter = function (field, regex) {
  const regexp = new RegExp(regex);
  return regexp.test(field);
};
