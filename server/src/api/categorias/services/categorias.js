'use strict';

/**
 * categorias service
 */

module.exports = {
  categorias: async () => {
    try {
      // fetching data
      const entries = await strapi.entityService.findMany(
        "api::category.category",
        {
          fields: ["id", "name"],
          // populate: {
          //   products: [
          //     {
          //       data: {
          //         fields: ["id", "name", "price"]
          //       }
          //     }
          //   ],
          // },
        }
      );

      // reduce the data to the format we want to return
      let entriesReduced;

      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {
          acc = acc || [];
          acc.push({
            id: item.id,
            name: item.name,
            // products: {
            //   id: item.products.id,
            //   name: item.products.name,
            //   price: item.products.price,
            // },
          });
          return acc;
        }, [])
      }

      return entriesReduced;
    } catch (err) {
      return err;
    }
  }
};