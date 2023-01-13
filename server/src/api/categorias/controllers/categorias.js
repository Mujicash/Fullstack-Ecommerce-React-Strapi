'use strict';

/**
 * A set of functions called "actions" for `categorias`
 */

module.exports = {
  async categorias(ctx, next) {
    try {
      const data = await strapi.service("api::categorias.categorias").categorias();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Error controlador api categorias", { moreDetails: err });
    }
  },
};
