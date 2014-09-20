'use strict';

/**
 * @ngdoc service
 * @name hackathon2App.gmail
 * @description
 * # gmail
 * Factory in the hackathon2App.
 */
angular.module('voicemailApp')
  .factory('gmailService', ['$http', '$q', function($http, $q) {

    var authorizationResult = false;

    hello.on('auth.login', function(auth){
      console.log(auth);
      authorizationResult = auth.authResponse;
    });

    return {
      isReady: function() {
        return (authorizationResult);
      },
      login: function(){
        hello.init({
            google   : '687398641113-k9v4gojg8suhg0r35trqtdq4613b1qm0.apps.googleusercontent.com'
          },
          {redirect_uri:'/redirect.html'}
        );

        hello.login('google', {scope: 'https://www.googleapis.com/auth/gmail.modify'});
      },
      getEmails: function () {
        //create a deferred object using Angular's $q service
        var deferred = $q.defer();
        var promise = $http.get('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=50',
          {
            headers: {
              Authorization:'Bearer ' + authorizationResult.access_token
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
              Authorization: 'Bearer ' + authorizationResult.access_token
            }
          }).success(function(data) {
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
        //return the promise of the deferred object
        return deferred.promise;
      }
    };

  }]);
