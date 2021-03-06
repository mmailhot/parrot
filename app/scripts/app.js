'use strict';

/**
 * @ngdoc overview
 * @name hackathon2App
 * @description
 * # hackathon2App
 *
 * Main module of the application.
 */
angular
  .module('voicemailApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/emaildisplay', {
        templateUrl: 'views/emaildisplay.html',
        controller: 'EmaildisplayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
