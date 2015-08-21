angular.module('loginModule', ['factory'])
  .controller('LoginController', loginController);

loginController.$inject = ['$scope', 'LoginFactory', 'SessionService'];
function loginController($scope, LoginFactory, SessionService) {
  var self = $scope;
  $scope.loginFailed = false;
  $scope.login = function() {
    LoginFactory.authenticate($scope.userName, $scope.password)
    .success(function(data) {
      // login is successful...send the user to /
      window.location.href = '/';
      SessionService.setUserLoggedIn(self.userName);
      //$scope.$digest();
    })
    .error(function(err) {
      $scope.loginFailed = true;
      $scope.userName = '';
      $scope.password = '';
      console.log("error authenticating ", err);
    });
  }
}