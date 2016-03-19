import { routerConfig } from './frontpage.route.js';
import { FrontpageController } from './frontpage.controller.js';

angular.module('hope.frontpage', [])
    .config(routerConfig)
    .controller('FrontpageController', FrontpageController);

