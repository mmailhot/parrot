'use strict';

/**
 * @ngdoc function
 * @name hackathon2App.controller:EmaildisplayCtrl
 * @description
 * # EmaildisplayCtrl
 * Controller of the hackathon2App
 */
angular.module('voicemailApp')
  .controller('EmaildisplayCtrl', function ($scope, $filter, $q, gmailService, witService) {

    $('#first-time-modal').modal();

    $scope.emails = [];

    gmailService.getEmails().t$scope.speech('Email #' + (index + 1));
      $scope.speech('From ' + email.sender);
      $scope.speech('The subject is ' + email.subject);
      $scope.speech(email.text);
      $scope.lastRead = index;hen(function (data) {
        for (var i = 0; i < data.messages.length; i++) {
            gmailService.getEmail(data.messages[i].id).then(function(e) {
                $scope.emails.push(e);
            }
          );
        }
    });


    $scope.lastRead = -1;

    $scope.speech = function speech(text) {
      var defer = $q.defer();
      text = new SpeechSynthesisUtterance(text);
      text.onend = defer.resolve;
      window.speechSynthesis.speak(text);

      return defer.promise;
    };

    $scope.readHeaders = function read(email, index) {
      var defer = $q.defer();
      $scope.speech('Email ' + (index + 1)).then(function(){
        $scope.speech('The subject is ' + email.subject).then(function(){
          $scope.speech('From ' + email.sender).then(function(){
            q.resolve();
          });
        });
      });
      return defer.promise;
    };

    $scope.readBody = function read(email) {
      var defer = $q.defer();
      $scope.speech(email.body).then(function(){
        q.resolve();
      });
      return defer.promise;
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

    $scope.readAll = function() {
      $scope.readFrom(0);
    }

    $scope.readFrom = function(id){
      if(id < emails.length()){
        $scope.readHeaders(emails[id],id).then(function() {
          $scope.parseSpeechFunction(id);
        });
      }else{
        var intent = witService.recognize().then(function(intent){
          if(intent == "finish"){
            $scope.speech("OK. Have a nice day!");
          }else{
            $scope.readFrom(id);
          }
        }):
      }
    }

    $scope.parseSpeechFunction = function(id){
      var intent = witService.recognize().then(function(intent){
        if(intent == "read"){
          $scope.readBody(emails[id]);
          $scope.parseSpeechFunction(id);
        }else if(intent == "repeat"){
          $scope.readFrom(id);
        }else if(intent == "finish"){
          $scope.speech("OK. Have a nice day!");
        }else if(intent == "flag"){
          $scope.flag(id);
          $scope.parseSpeechFunction(id);
        }else{
          $scope.readFrom(id + 1s);
        }
      });
    }

    $scope.flag = function(id){
      console.log("Email #" + id " flagged!");
    }
  });
