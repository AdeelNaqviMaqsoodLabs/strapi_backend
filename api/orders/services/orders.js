"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    let orderdata = strapi.query("orders").find(params, ["food", "food.name"]);
    return orderdata;
  },
};
