
var module = angular.module('loginModule', ['factory'])

.controller('LoginController', ['$scope', 'LoginFactory', function($scope, LoginFactory) {
  $scope.login = function() {
    LoginFactory.authenticate($scope.username, $scope.password)
    .then(function(data) {
      console.log('data! ', data);
    });
  }
}]);