angular.module('lunch-organizer-app', [
  'loginModule',
  'signupModule',
  'profileModule',
  'lunchModule',
  'dashboardModule',
  'ngRoute'
])
.config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
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
    .when('/Results', {
      templateUrl: '/views/results.html',
      controller: 'ResultsController'
    })
    .otherwise({
      redirectTo: '/'
    });

}
