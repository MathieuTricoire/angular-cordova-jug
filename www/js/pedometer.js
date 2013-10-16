(function() {
  'use strict';

  var Pedometer = angular.module('pedometerApp', ['Cordova']);

  Pedometer.controller('PedometerCtrl',
           ['$scope', 'pedometer',
    function($scope,   pedometer) {

      $scope.pedometer = pedometer;

      $scope.action = function () {
        return pedometer.isStarted() ? 'STOP' : 'START';
      };

      $scope.resetSteps = function () {
        pedometer.steps = 0;
      };

      $scope.header.setSettingsPath('/pedometer/settings');
    }]
  );

  Pedometer.controller('PedometerSettingsCtrl',
           ['$scope', 'pedometer',
    function($scope,   pedometer) {
      $scope.pedometer = pedometer;
    }]
  );


  Pedometer.factory('pedometer',
           ['accelerometer', '$timeout',
    function(accelerometer,   $timeout) {

      var promise = null;

      var pedometer = {
        steps: 0,
        acceleration: null,
        pAcceleration: null,
        dotStep: 0.82,
        frequency: 1000
      };

      pedometer.isStarted = function isStarted() {
        return null !== promise;
      };

      pedometer.toggle = function toggle() {
        if (!this.isStarted()) {
          countSteps();
        } else {
          $timeout.cancel(promise);
          promise = null;
          pedometer.acceleration = null;
          pedometer.pAcceleration = null;
        }
      };

      function countSteps() {

        accelerometer.getCurrentAcceleration(function(acceleration) {
          pedometer.pAcceleration = pedometer.acceleration;
          pedometer.acceleration = acceleration;

          //From: https://github.com/pdetagyos/Pedometer/blob/master/Pedometer/ViewController.m
          if (pedometer.pAcceleration) {
            var
              px = pedometer.pAcceleration.x,
              py = pedometer.pAcceleration.y,
              pz = pedometer.pAcceleration.z,

              xx = pedometer.acceleration.x,
              yy = pedometer.acceleration.y,
              zz = pedometer.acceleration.z,

              a = Math.abs(Math.sqrt(px * px + py * py + pz * pz)),
              b = Math.abs(Math.sqrt(xx * xx + yy * yy + zz * zz)),
              dot = ((px * xx) + (py * yy) + (pz * zz)) / (a * b);

            if (dot <= pedometer.dotStep) {
              pedometer.steps++;
            }
          }

          promise = $timeout(countSteps, pedometer.frequency);
        });
      }

      return pedometer;
    }]
  );

})();
