'use strict';

/**
 * @ngdoc function
 * @name hackathon2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathon2App
 */
angular.module('hackathon2App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
