
var app = angular.module('lunch-organizer-app', [
  'loginModule',
  'signupModule',
  'profileModule',
  'lunchModule',
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/Login', {
      templateUrl: '/views/login.html',
      controller: 'LoginController'
     })
     .when('/Signup', {
       templateUrl: '/views/signup.html',
       controller: 'SignupController'
     })
     .when('/SetProfile', {
       templateUrl: '/views/setprofile.html',
       controller: 'ProfileController'
     })
     .when('/OrganizeLunch', {
       templateUrl: '/views/organizelunch.html',
       controller: 'LunchController'
     })
    .otherwise({
      redirectTo: '/'
    });
}]);