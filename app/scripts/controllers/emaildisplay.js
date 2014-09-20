'use strict';

/**
 * @ngdoc function
 * @name hackathon2App.controller:EmaildisplayCtrl
 * @description
 * # EmaildisplayCtrl
 * Controller of the hackathon2App
 */
angular.module('voicemailApp')
  .controller('EmaildisplayCtrl', function ($scope, $filter) {

    $scope.emails = [
      {
        sender: 'Daniel',
        subject: 'Test #1',
        text: 'Hello, test 1.'
      },
      {
        sender: 'Daniel',
        subject: 'Test #2',
        text: 'Hello, test 2.'
      },
      {
        sender: 'Daniel',
        subject: 'Test #3',
        text: 'Hello, test 3.'
      },
      {
        sender: 'Daniel',
        subject: 'Test #4',
        text: 'Hello, test 4.'
      }
    ];

    $scope.lastRead = -1;

    $scope.speech = function speech(text) {
      text = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(text);
    };

    $scope.read = function read(email, index) {
      $scope.speech('Email #' + (index + 1));
      $scope.speech('From ' + email.sender);
      $scope.speech('The subject is ' + email.subject);
      $scope.speech(email.text);
      $scope.lastRead = index;
    };

    $scope.readAll = function readAll() {
      var emails = $filter('filter')($scope.emails, $scope.keyword);

      $scope.speech('There are ' + emails.length + ' unread emails.');
      emails.forEach($scope.read);
    };

    $scope.readPrevious = function readPrevious() {
      var index = $scope.lastRead - 1;
      $scope.read($scope.emails[index], index);
    };

    $scope.readNext = function readNext() {
      var index = $scope.lastRead + 1;
      $scope.read($scope.emails[index], index);
    };

    $scope.pauseReading = function pauseReading() {
      window.speechSynthesis.pause();
    };

    $scope.resumeReading = function resumeReading() {
      window.speechSynthesis.resume();
    };

  });
