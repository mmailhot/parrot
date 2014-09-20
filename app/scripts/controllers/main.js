'use strict';

/**
 * @ngdoc function
 * @name hackathon2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathon2App
 */
angular.module('voicemailApp')
  .controller('MainCtrl', function ($scope, gmailService) {

    $scope.login = function () {
      gmailService.login();
    };

    $scope.getEmails = function () {
      gmailService.getEmails().then(function (data) {
        console.log(data);
      });
    };

    $scope.getEmail = function () {
      gmailService.getEmail("14893e0b0b0f95ad").then(function (data) {
        console.log(data);
      });
    }

  });
