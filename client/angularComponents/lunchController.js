angular.module('lunchModule', ['factory', 'angularSpinner'])
  .controller('LunchController', lunchController);

lunchController.$inject = ['$scope', '$rootScope', '$http', 'ResultsService', 'usSpinnerService'];
function lunchController($scope, $rootScope, $http, ResultsService, usSpinnerService) {
  $scope.allUsers = [
    'Bob', 'Dave'
  ];

  $scope.attendees = [
  ];

  $scope.cuisines = [ 'Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Indian'];

  $scope.selectedUser = "Select User...";
  $scope.selectedCuisine = "Select Cuisine...";

  $scope.addAttendee = function() {
    var attendee = $scope.selectedUser;
    var index = $scope.attendees.indexOf(attendee);
    if (index < 0) {
      $scope.attendees.push(attendee);
      // remove from users
      index = $scope.allUsers.indexOf(attendee);
      $scope.allUsers.splice(index, 1);
      $scope.selectedUser = "Select User...";
    }
  };

  $scope.userSelected = function(user) {
    $scope.selectedUser = user;
  }

  $scope.removeAttendee = function(attendee) {
    var index = $scope.attendees.indexOf(attendee);
    if (index >= 0) {
      $scope.attendees.splice(index, 1);
      // add it to users
      $scope.allUsers.push(attendee);
    }
  }

  $scope.cuisineSelected = function(cuisine) {
    $scope.selectedCuisine = cuisine;
  }

  $scope.organizeLunch = function() {
    $scope.startSpin();

    var self = this;
    setTimeout(function () {

      $http.post('/organizeLunch', {
        data: $scope.attendees
      })
        .success(function (response) {
          // ok, we have got all the information; send the user to organize lunch
          window.location.href = '/#/Results';
          ResultsService.setResults(response);
        })
        .catch(function (err) {
          console.log(err);
        })
        .finally(function () {
          $scope.stopSpin();
        });
    }, 5000);
  }

  // Spinner stuff
  $scope.startcounter = 0;
  $scope.startSpin = function() {
    if (!$scope.spinneractive) {
      usSpinnerService.spin('spinner-1');
      $scope.startcounter++;
    }
  };

  $scope.stopSpin = function() {
    if ($scope.spinneractive) {
      usSpinnerService.stop('spinner-1');
    }
  };
  $scope.spinneractive = false;

  $rootScope.$on('us-spinner:spin', function(event, key) {
    $scope.spinneractive = true;
  });

  $rootScope.$on('us-spinner:stop', function(event, key) {
    $scope.spinneractive = false;
  });
}
