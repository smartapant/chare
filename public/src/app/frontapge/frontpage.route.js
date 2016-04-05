export function routerConfig ($stateProvider) {
  'ngInject';
  $stateProvider
      .state('frontpage', {
        url: '/frontpage',
        templateUrl: 'app/frontapge/frontpage.html',
        controller: 'FrontpageController',
        controllerAs: 'frontpageCtrl'
      });
}
