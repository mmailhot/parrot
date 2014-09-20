'use strict';

/**
 * @ngdoc function
 * @name hackathon2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hackathon2App
 */
angular.module('hackathon2App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
