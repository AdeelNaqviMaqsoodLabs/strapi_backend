"use strict";
const slugify = require("slugify");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  profit: async (ctx) => {
    const { id } = ctx.params;
    let total_profit = 0;
    let resdata = await strapi.connections.default.raw(
      `SELECT  *,SUM(Total_Amount) AS Profit FROM orders 
       where restaurant= ${id}
       GROUP BY restaurant

      `
    );
    return resdata;
  },
  soldfoods: async (ctx) => {
   
    let data2;
    const { id } = ctx.params;

    let resdata = await strapi.connections.default.raw(
      `SELECT  * ,SUM(quantity)  FROM orders o JOIN items i ON i.restaurant=o.restaurant 
      where o.restaurant=${id}
      GROUP BY food
      ORDER BY SUM(quantity) DESC
      `
    );
   

    return resdata[0];
  },
};
