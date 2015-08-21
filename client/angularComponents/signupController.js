angular.module('signupModule', ['factory'])
  .controller('SignupController', signupController);

/**
 * SignupController: inject $scope, $http, and SessionService
 */
signupController.$inject = ['$scope', '$http', 'SessionService'];
function signupController($scope, $http, SessionService) {
  $scope.signup = function() {
    $http.post('/signup', {
      data: {
        name: $scope.name,
        email: $scope.email,
        userName: $scope.userName,
        password: $scope.password
      }
    })
    .success(function(response) {
      // ok, we have signed up the user, so now get more info by redirecting
      // to our set profile page
      window.location.href = '/#/SetProfile';
      SessionService.setUserLoggedIn(true);

    }, function(err) {
      console.log(err);
    });
  };
}
