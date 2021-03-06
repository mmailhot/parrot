'use strict';

/**
 * @ngdoc service
 * @name hackathon2App.gmail
 * @description
 * # gmail
 * Factory in the hackathon2App.
 */
angular.module('voicemailApp')
  .factory('gmailService', ['$http', '$q', '$window','$location', function($http, $q, $window, $location) {

    var authorizationResult = false;

    

    return {
      isReady: function() {
        return (authorizationResult);
      },
      login: function(){
        var defer = $q.defer();
        hello.init({
            google   : '687398641113-k9v4gojg8suhg0r35trqtdq4613b1qm0.apps.googleusercontent.com'
          },
          {redirect_uri:'/redirect.html'}
        );
        hello.on('auth.login', function(auth){
          $window.sessionStorage.token = auth.authResponse.access_token;
          defer.resolve();
        });
        hello.login('google', {scope: 'https://www.googleapis.com/auth/gmail.modify'});
        return defer.promise;
      },
      getEmails: function () {
        //create a deferred object using Angular's $q service
        var deferred = $q.defer();
        var promise = $http.get('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=6&q=label:inbox',
          {
            headers: {
              Authorization:'Bearer ' + $window.sessionStorage.token
            }
          }).success(function(data) {
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
        //return the promise of the deferred object
        return deferred.promise;
      },
      getEmail: function (id){
        //create a deferred object using Angular's $q service
        var deferred = $q.defer();
        var promise = $http.get('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/gmail/v1/users/me/messages/' + id,
          {
            headers: {
              Authorization: 'Bearer ' + $window.sessionStorage.token
            }
          }).success(function(data) {
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
        //return the promise of the deferred object
        return deferred.promise;
      },
      sendEmail: function(email){
        var body = "To: danielcardosods@gmail.com\nFrom: Kaye Mao\nSubject: Re:" + email.subject + "\n\n" +
                    "Sorry, I'm busy commuting right now, but I'll get back to you as soon as I can.";
        var message = {
          raw: btoa(body)
        };
        var deferred = $q.defer();
        $http.post('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/gmail/v1/users/me/messages/send',message,
          {
            headers: {
              Authorization: 'Bearer ' + $window.sessionStorage.token
            }
          }).success(function(data) {
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
        return deferred.promise;
      },

        cleanSender: function (sender){
            return sender.split("<")[0];
      },
        getTheBody: function (e){
            if (e.payload.body.data){
                e = (B64.decode(e.payload.body.data));
            }else{
                e = (B64.decode(e.payload.parts[0].body.data));
            }
            
            e = e.split(" ");
            
            for (var a = 0; a < e.length; a++){
                if (e[a].length > 10){
                    e[a] = '';
                }
            }  
            
            e = e.join(' ');
            
            return e;
      }
    };

  }]);
