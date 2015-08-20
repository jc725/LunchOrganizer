angular.module('profileModule', [])
  .controller('ProfileController', profileController);

profileController.$inject = ['$scope', '$http'];
function profileController($scope, $http) {
  $scope.preferences = {
    seaFood: false,
    chinese: false
  };

  $scope.setProfile = function() {
    $http.post('/setprofile', {
      data: $scope.preferences
    })
      .success(function(response) {
        // ok, we have got all the information; send the user to organize lunch
        window.location.href = '/';
      }, function(err) {
        console.log(err);
      });
  };
}
