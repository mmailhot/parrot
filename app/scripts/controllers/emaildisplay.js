'use strict';

/**
 * @ngdoc function
 * @name hackathon2App.controller:EmaildisplayCtrl
 * @description
 * # EmaildisplayCtrl
 * Controller of the hackathon2App
 */
angular.module('voicemailApp')
  .controller('EmaildisplayCtrl', function ($scope, $filter, gmailService) {

    $('#first-time-modal').modal();

    emaildata = [];  
      
    $scope.emails = [
      {
        sender: 'Daniel',
        subject: 'Test #1',
        text: 'Hello, test 1.'
      }
    ];
      
    gmailService.getEmails().then(function (data) {
        for (var i = 0; i < data.messages.length; i++) { 
            gmailService.getEmail(data.messages[i].id).then(function(e) {
                emaildata.emails.push(e);
            }
          );
        }
    });
      

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

    $scope.stopReading = function stopReading() {
      window.speechSynthesis.cancel();
    };
  });
