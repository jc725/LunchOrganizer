angular.module('dashboardModule', ['factory'])
  .controller('DashboardController', dashboardController);

dashboardController.$inject = ['$scope', 'SessionService'];
function dashboardController($scope, SessionService) {
    $scope.isUserLoggedIn = SessionService.getUserLoggedIn();
    $scope.logout = function() {
      SessionService.setUserLoggedIn(false);
      $scope.$digest();
    }
}

