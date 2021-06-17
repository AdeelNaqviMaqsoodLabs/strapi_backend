"use strict";
let i = 0;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      let items = await strapi.query("items").find({ id: data.items });
      let amount = 0;
      for (let i = 0; i < items.length; i++) {
        amount += items[i].quantity * items[i].food.price;
      }
      data.Total_Amount = amount;
      data.restaurant = items[0].restaurant.id;
    },
    afterUpdate: async (data) => {
      let items = await strapi.query("items").find();
      let amount = 0;
      for (let i = 0; i < data.items.length; i++) {
        amount += items[i].quantity * items[i].food.price;
      }
      if (i == 0) {
        i++;
        strapi.query("orders").update(
          { id: data.id },
          {
            Total_Amount: amount,
            restaurant: data.items[0].restaurant,
            selfUpdate: false,
          }
        );
      } else {
        i = 0;
      }
    },
  },
};
