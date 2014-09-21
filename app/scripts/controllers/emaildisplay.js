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

    witService.connect();

    $scope.emails = [];

    gmailService.getEmails().then(function (data) {
        for (var i = 0; i < data.messages.length; i++) {
            gmailService.getEmail(data.messages[i].id).then(function(e) {
                var x,t = 0;
                for (var j = 0; j < e.payload.headers.length; j++){
                    if (e.payload.headers[j].name === "Subject"){
                        x = j;
                    }
                }
                for (var w = 0; w < e.payload.headers.length; w++){
                    if (e.payload.headers[w].name === "From"){
                        t = w;
                    }
                }
                $scope.emails.push({"read": false, "subject":e.payload.headers[x].value, "body":gmailService.getTheBody(e),"sender":gmailService.cleanSender(e.payload.headers[t].value)});
            }                                               );
        }
    });

    $scope.finishFilter = function finishFilter(item){
      if((item.subject.indexOf($scope.keyword)!=-1 || item.sender.indexOf($scope.keyword)!=-1) && !item.read){
        return true;
      }else{
        return false;
      }
    }

    $scope.playing = -1;

    $scope.speech = function speech(text) {
      console.log("Speaking: " + text);
      var defer = $q.defer();
      text = new SpeechSynthesisUtterance(text);
      text.volume = 1;
      text.onend = defer.resolve;
      text.onerror = function(err){
        console.log(err);
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(text);
      console.log(text);
      return defer.promise;
    };

    $scope.readHeaders = function read(email, index) {
      var defer = $q.defer();
      $scope.playing = index;
      console.log("READING HEADERS INTERNAL");
      $scope.speech('Email ' + (index + 1)).then(function(){
        $scope.speech('The subject is ' + email.subject).then(function(){
          $scope.speech('From ' + email.sender).then(function(){
           console.log("RESOLVING HEADERS INTERNAL");
           defer.resolve();
          });
        });
      });
      return defer.promise;
    };

    $scope.readBody = function read(email, index) {
      var defer = $q.defer();
      $scope.playing = index;
      $scope.speech(email.body).then(function(){
        defer.resolve();
      });
      return defer.promise;
    };

    $scope.readAll = function readAll() {
      $scope.filteredEmails = $filter('filter')($scope.emails,$scope.keyword);
      $scope.readFrom(0);
    }

    $scope.readFrom = function(id){
      console.log("READING: "  + id);
      if(id < $scope.filteredEmails.length){
        console.log("READING HEADERS");
        $scope.readHeaders($scope.filteredEmails[id],id).then(function() {
          $scope.parseSpeechFunction(id);
        });
      }else{
        console.log("DONE");
        $scope.speech("All messages read. Do you want to finish or reread?").then(function(){
          var intent = witService.recognize().then(function(intent){
            if(intent == "finish"){
              $scope.speech("OK. Have a nice day!");
              $scope.playing = -1;
            }else{
              $scope.readFrom(id);
            }
          });
        });
      }
    }

    $scope.parseSpeechFunction = function(id){
      var intent = witService.recognize().then(function(intent){
        if(intent == "read"){
          $scope.readBody($scope.filteredEmails[id],id);
          $scope.parseSpeechFunction(id);
        }else if(intent == "repeat"){
          $scope.readFrom(id);
        }else if(intent == "finish"){
          $scope.speech("OK. Have a nice day!");
          $scope.playing = -1;
        }else if(intent == "flag"){
          $scope.flag(id);
          $scope.speech("Email flagged.").then(function(){
            $scope.parseSpeechFunction(id);
          });
        }else if(intent == "flag_and_reply"){
          $scope.flag(id);
          $scope.speech("Sending preset reply").then(function(){
            gmailService.sendEmail($scope.filteredEmails[id]).then(function(){
              $scope.speech("Email Sent").then(function(){
                $scope.parseSpeechFunction(id);
              });
            });
          });
        }else{
          $scope.filteredEmails[id].read = true;
          $scope.readFrom(id + 1);
        }
      });
    }

    $scope.flag = function(id){
      $scope.filteredEmails[id].flagged = true;
    }
  });
