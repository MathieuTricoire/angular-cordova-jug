(function() {
  'use strict';

  var Cordova = angular.module('Cordova', []);

  Cordova.factory('cordovaReady', function() {
    return function(fn) {

      var queue = [];

      var impl = function() {
        queue.push(Array.prototype.slice.call(arguments));
      };

      document.addEventListener('deviceready', function() {
        queue.forEach(function(args) {
          fn.apply(this, args);
        });
        impl = fn;
      }, false);

      return function() {
        return impl.apply(this, arguments);
      };
    };
  });

  Cordova.factory('accelerometer',
           ['$timeout', 'cordovaReady',
    function($timeout,   cordovaReady) {
      return {
        getCurrentAcceleration: cordovaReady(function(onSuccess, onError) {

          navigator.accelerometer.getCurrentAcceleration(function() {
            var that = this,
              args = arguments;

            if (onSuccess) {
              $timeout(function() {
                onSuccess.apply(that, args);
              });
            }
          }, function() {
            var that = this,
              args = arguments;

            if (onError) {
              $timeout(function() {
                onError.apply(that, args);
              });
            }
          });
        })
      };
    }]
  );

  Cordova.factory('geolocation',
           ['$timeout', 'cordovaReady',
    function($timeout,   cordovaReady) {
      return {
        getCurrentPosition: cordovaReady(function(onSuccess, onError, options) {
          navigator.geolocation.getCurrentPosition(function() {
            var that = this,
              args = arguments;

            if (onSuccess) {
              $timeout(function() {
                onSuccess.apply(that, args);
              });
            }
          }, function() {
            var that = this,
              args = arguments;

            if (onError) {
              $timeout(function() {
                onError.apply(that, args);
              });
            }
          },
          options);
        })
      };
    }]
  );

  Cordova.factory('camera',
           ['$timeout', 'cordovaReady',
    function($timeout,   cordovaReady) {
      return {
        getPicture: cordovaReady(function(onSuccess, onError, options) {
          navigator.camera.getPicture(function() {
            var that = this,
              args = arguments;

            if (onSuccess) {
              $timeout(function() {
                onSuccess.apply(that, args);
              });
            }
          }, function() {
            var that = this,
              args = arguments;

            if (onError) {
              $timeout(function() {
                onError.apply(that, args);
              });
            }
          },
          options);
        })
      };
    }]
  );

})();
