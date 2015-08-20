var module = angular.module('signupModule', [])

  .controller('SignupController', ['$scope', '$http', function($scope, $http) {
    $scope.signup = function() {
      $http.post('/signup', {
        data: {
          name: $scope.name,
          email: $scope.password,
          userName: $scope.userName,
          password: $scope.password
        }
      })
      .success(function(response) {
        // ok, we have signed up the user, so now get more info by redirecting
        // to our set profile page
        window.location.href = '/#/SetProfile';
      }, function(err) {
        console.log(err);
      });
    };

  }]);
