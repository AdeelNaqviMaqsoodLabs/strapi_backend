"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find() {
    let data = strapi.query("orders").find({}, ["items", "items.food.name"]);
    return data;
  },

  // update: async (data) => {
  //   const { id } = data.params;
  //   let data1 = await strapi.query("orders").find({});
  //   console.log("dataaaaaaa", data.request.body.items);
  //   // let data2 = data.request.body.items?data.request.body.items:data.response.body.items;
  //   // strapi.query("orders").update({ id: data.id }, { items: data2 });

  //   let resdata = await strapi.connections.default.raw(
  //     `SELECT * from items i JOIN orders o GROUP BY o.restaurant

  //     `
  //   );
  //   console.log("Resdata: ", resdata);
  //   return resdata;
  // },
};
