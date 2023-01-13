'use strict';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product');
