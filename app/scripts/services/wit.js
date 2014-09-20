angular.module('voicemailApp').factory('witService', ["$http","$q",function($http, $q) {

    var mic = new Wit.Microphone();
    var ready = false;

    var WitAPI = {
        connect: function() {
            console.log("Attemting to connect");
            var defer = $q.defer();

            mic.onready = function() {
                console.log("mic-ready")
                ready = true;
                defer.resolve();
            }

            mic.onerror = function(err) {
                console.log("mic-error")
                console.log(err);
            }


            mic.connect("7HYPIHZKGQEDDNDSIXBYN4DKSXWRCYCE");

            return defer.promise;
        },
        start: function(){
            mic.start();
        },
        end: function(){
            var defer = $q.defer();
            mic.onresult = function(intent,intent2) {
                console.log("RESOLVED");
                console.log(intent);
                console.log(intent2);
                defer.resolve(intent);
            }
            mic.stop();
            return defer.promise;
        },
        recognize: function(){
            var defer = $q.defer();
            if(!ready){
                WitAPI.connect().then(function(){
                    var msg = new SpeechSynthesisUtterance('Speak now:');
                    window.speechSynthesis.speak(msg);
                    msg.onend = function(){
                        console.log("END");
                        WitAPI.start();
                        setTimeout(function(){
                            console.log("RECORDING STOPPED");
                            WitAPI.end().then(function(intent){
                                defer.resolve(intent);
                            })
                        },2000);
                    };
                    
                });
            }else{
                var msg = new SpeechSynthesisUtterance('Speak now:');
                window.speechSynthesis.speak(msg);
                msg.onend = function(){
                    WitAPI.start();
                    setTimeout(function(){
                        WitAPI.end().then(function(intent){
                            defer.resolve(intent);
                        })
                    },2000);
                }
            }
            return defer.promise;
        }
    };

    return WitAPI;
}]);