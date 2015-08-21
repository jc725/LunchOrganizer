angular.module('profileModule', [])
  .controller('ProfileController', profileController);

profileController.$inject = ['$scope', '$http', 'SessionService'];
function profileController($scope, $http, SessionService) {
  $scope.done = false;

  $scope.preferences = {
    seaFood: false,
    chinese: false
  };

  $scope.setProfile = function() {
    $scope.done = true;

    setTimeout(function() {
      $http.post('/setprofile', {
        data: {
          user: SessionService.getUserLoggedIn(),
          prefs: $scope.preferences
        }
      })
        .success(function(response) {
          // ok, we have got all the information; send the user to organize lunch
          window.location.href = '/';
        }, function(err) {
          console.log(err);
        });
    }, 1000);

  };
}
