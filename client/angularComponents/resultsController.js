angular.module('resultsModule', ['factory'])
  .controller('ResultsController', resultsController);

resultsController.$inject = ['$scope', 'ResultsService'];
function resultsController($scope, LoginFactory, ResultsService) {
  $scope.results = ResultsService.getResults();
}

