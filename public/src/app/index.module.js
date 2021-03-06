import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

angular.module('hope', [
    'ui.router',
    'ui.bootstrap',
    'toastr',

    'hope.frontpage'
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock);
