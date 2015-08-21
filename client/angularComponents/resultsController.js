angular.module('resultsModule', ['factory'])
  .controller('ResultsController', resultsController);

resultsController.$inject = ['$scope', 'ResultsService'];
function resultsController($scope, ResultsService) {
  $scope.recommendations = ResultsService.getResults();
  console.log($scope.recommendations);
  for (var i = 0; i < $scope.recommendations.length; ++i) {
    console.log($scope.recommendations[i]);
  }
}

