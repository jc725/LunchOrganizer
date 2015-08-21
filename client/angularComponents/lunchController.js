angular.module('lunchModule', ['factory', 'angularSpinner'])
  .controller('LunchController', lunchController);

lunchController.$inject = ['$scope', '$rootScope', '$http', 'ResultsService', 'usSpinnerService', 'SessionService'];
function lunchController($scope, $rootScope, $http, ResultsService, usSpinnerService, SessionService) {

  $scope.allUsers = [];

  // add the logged in user automatically
  $scope.attendees = [ SessionService.getUserLoggedIn() ];

  $scope.cuisines = [ 'Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Indian'];

  var selectedUser = "Select User...";
  $scope.selectedUser = selectedUser;
  $scope.selectedCuisine = "Select Cuisine...";

  $http.get('/users')
    .success(function (results) {
      for (var i = 0; i < results.length; ++i) {
        var username = results[i].username;
        $scope.allUsers.push(username);
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  $scope.addAttendee = function() {
    var attendee = $scope.selectedUser;
    if (attendee !== selectedUser) {
      var index = $scope.attendees.indexOf(attendee);
      if (index < 0) {
        $scope.attendees.push(attendee);
        $scope.selectedUser = selectedUser;
      } else {
        $scope.userAlreadyAdded = true;
      }
    }
  };

  $scope.userSelected = function(user) {
    $scope.selectedUser = user;
    $scope.userAlreadyAdded = false;
  }

  $scope.removeAttendee = function(attendee) {
    var index = $scope.attendees.indexOf(attendee);
    if (index >= 0) {
      $scope.attendees.splice(index, 1);
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
    }, 2000);
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
