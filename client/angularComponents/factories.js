
var module = angular.module('factory', [])

.factory('LoginFactory', ['$http', function($http) {
  var authenticate = function(username, password) {
    return $http({
      url: '/login',
      method: 'POST',
      data: {userName: username, password: password},
      success: function(res) {
        console.log("authentication successful: ", res);
        return res;
      },
      error: function(err) {
        console.log("err=", err);
      }
    });
  }

  return {
    authenticate: authenticate
  };
}]);
