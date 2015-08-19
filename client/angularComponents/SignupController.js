var module = angular.module('signupModule', [])

  .controller('SignupController', ['$scope', '$http', function($scope, $http) {
    $scope.signup = function() {

      console.log('signing up with ');
      console.log('name:', $scope.name);
      $http.post('/signup', {
        data: {
          name: $scope.name,
          email: $scope.password,
          userName: $scope.userName,
          password: $scope.password
        }
      })
      .then(function(response) {

      }, function(err) {

      });
    }
  }]);
