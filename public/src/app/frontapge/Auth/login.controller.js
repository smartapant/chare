angular.module('hope.frontpage')
  .controller('LoginController',LoginController);

LoginController.$inject = ['$scope','$uibModal',$log];

function LoginController($scope, $uibModal, $log) {

  $scope.open = function () {

  }
}
