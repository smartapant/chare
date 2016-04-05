"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
    'post /signup' : 'AuthController.signup',
    'post /signin' : 'AuthController.signin'
  }
};
