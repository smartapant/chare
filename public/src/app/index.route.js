export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/frontapge/frontpage.html',
      controller: 'FrontpageController',
      controllerAs: 'frontpageCtrl'
    });

  $urlRouterProvider.otherwise('/');
}
