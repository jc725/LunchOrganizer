
var app = angular.module('lunch-organizer-app', [
  'loginModule',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/Login', {
      templateUrl: '/views/login.html',
      controller: 'LoginController'
     })
    // .when('/Signup', {
    //   templateUrl: '/signup.html',
    //   controller: 'SignupController'
    // })
    // .when('/SetProfile', {
    //   templateUrl: '/setprofile.html',
    //   controller: 'ProfileController'
    // })
    // .when('/OrganizeLunch', {
    //   templateUrl: '/organizelunch.html',
    //   controller: 'LunchController'
    // })
    .otherwise({
      redirectTo: '/Login'
    });
}]);