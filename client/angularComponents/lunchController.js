angular.module('lunchModule', ['factory'])
  .controller('LunchController', lunchController);

lunchController.$inject = ['$scope', '$http', 'ResultsService'];
function lunchController($scope, $http, ResultsService) {
  $scope.attendees = [];
  $scope.organizeLunch = function() {
    $http.post('/organizeLunch', {
      data: $scope.attendees
    })
      .success(function(response) {
        // ok, we have got all the information; send the user to organize lunch
        window.location.href = '/#/Results';
        ResultsService.setResults(response);
      }, function(err) {
        console.log(err);
      });
  }
}

