var module = angular.module('profileModule', [])

  .controller('ProfileController', ['$scope', '$http', function($scope, $http) {
    $scope.preferences = {
      seaFood: false,
      chinese: false
    };

    $scope.setProfile = function() {
      $http.post('/setprofile', {
        data: $scope.preferences
      })
        .success(function(response) {
          // ok, we have got all the information; send the user to the root
          window.location.href = '/';
        }, function(err) {
          console.log(err);
        });
    };

  }]);
