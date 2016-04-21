export class FrontpageController {

  constructor($scope, $modal) {
    'ngInject';
    this.activate($scope, $modal);
  }

  activate($scope, $uibModal) {

    $scope.openLoginModal = function(){
      $uibModal.open({
        templateUrl: 'app/frontapge/auth/login.html',
        size:'sm'
      });
    };

    $scope.openSignUpModal = function(){
      $uibModal.open({
        templateUrl: 'app/frontapge/auth/registration.html',
        size:'sm'
      });
    };

  }

}
