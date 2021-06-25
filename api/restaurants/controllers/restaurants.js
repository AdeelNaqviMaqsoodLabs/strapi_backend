"use strict";
const slugify = require("slugify");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  profit: async (ctx) => {
    try {
      const { id } = ctx.params;
      let total_profit = 0;
      let resdata = await strapi.connections.default.raw(
        `SELECT  *,SUM(Total_Amount) AS Profit FROM orders 
       where restaurant= ${id}
       GROUP BY restaurant
      `
      );

      if (!resdata.length) {
        throw "No Profit";
      } else {
        console.log("Data  of Sold food", resdata);
        let status = {
          status: 200,
        };
        resdata[0].status = status.status;

        return resdata;
      }
    } catch (error) {
      let err = {
        error: error,
        status: 404,
      };

      return err;
    }
  },
  soldfoods: async (ctx) => {
    try {
      const { id } = ctx.params;

      let resdata = await strapi.connections.default.raw(
        `SELECT  * ,SUM(quantity)  FROM orders o JOIN items i ON i.restaurant=o.restaurant 
        where o.restaurant=${id}
        GROUP BY food
        ORDER BY SUM(quantity) DESC
        `
      );

      if (!resdata.length) {
        throw "No item Sold yet";
      } else {
        console.log("Data  of Sold food", resdata);
        return resdata[0];
      }
    } catch (error) {
      let err = {
        error: error,
        status: 404,
      };

      return err;
    }
  },
};
