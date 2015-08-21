angular.module('loginModule', ['factory'])
  .controller('LoginController', loginController);

loginController.$inject = ['$scope', 'LoginFactory', 'SessionService'];
function loginController($scope, LoginFactory, SessionService) {
  $scope.login = function() {
    LoginFactory.authenticate($scope.userName, $scope.password)
    .success(function(data) {
      // login is successful...send the user to /
      SessionService.setUserLoggedIn(true);
      $scope.$digest();
    });
  }
}