(function() {
  'use strict';

  var Geoloc = angular.module('geolocApp', ['Cordova']);

  Geoloc.controller('GeolocCtrl',
           ['$scope', 'geolocation',
    function($scope,   geolocation) {

      $scope.geoloc = {};

      $scope.updatePosition = function() {
        geolocation.getCurrentPosition(function(geoloc) {
          $scope.geoloc = geoloc;
        });
      };
    }]
  );

})();
