export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/frontapge/frontpage.html',
      controllerAs: 'main'
    });

  $urlRouterProvider.otherwise('/');
}
