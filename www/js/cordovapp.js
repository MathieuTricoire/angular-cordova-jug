(function() {
  'use strict';

  var cordovapp = angular.module('cordovapp', [
    'ngRoute',
    'ngAnimate',
    'pedometerApp',
    'geolocApp'
  ]);

  cordovapp.run(
           ['$rootScope', '$location', '$route',
    function($rootScope  , $location,   $route) {

      var historic = [];

      $rootScope.header = {
        setTitle: function(title) {
          $rootScope.headerTitle = title;
        },
        setSettingsPath: function(settingsPath) {
          $rootScope.settingsPath = settingsPath;
        }
      };


      // Inspired by revolunet
      // http://blog.revolunet.com/angular-for-mobile/#10
      $rootScope.nav = {
        go: function(route, direction) {
          if (!direction) {
            direction = 'rtl';
            var currentRouteDepth = $route.current.depth || Number.MIN_VALUE,
              nextRouteDepth = $route.routes[route].depth || Number.MAX_VALUE;
            if (currentRouteDepth && nextRouteDepth) {
              if (nextRouteDepth >= currentRouteDepth) {
                direction = 'rtl';
              } else {
                direction = 'ltr';
              }
            }
          }

          if ('rtl' === direction) {
            historic.push($location.path());
          } else if (historic.length) {
            historic.pop();
          }

          $rootScope.viewAnimation = 'slide-' + direction;
          $location.path(route);
        },

        goPrevious: function() {
          if (historic.length) {
            this.go(historic[historic.length - 1], 'ltr');
          }
        },

        hasPrevious: function() {
          return historic.length > 0;
        }
      };

      $rootScope.$on('$routeChangeStart', function(e, next) {
        $rootScope.header.setTitle(next.title || 'Cordovapp');
        $rootScope.header.setSettingsPath();
      });
    }]
  );


  cordovapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/list', {
      templateUrl: 'partials/list.html',
      controller:  'ListCtrl',
      title:       'Cordovapp',
      depth: 1
    })

    .when('/pedometer', {
      templateUrl: 'partials/pedometer.html',
      controller:  'PedometerCtrl',
      title:       'Pedometer',
      depth: 2
    })

    .when('/pedometer/settings', {
      templateUrl: 'partials/pedometer_settings.html',
      controller:  'PedometerSettingsCtrl',
      title:       'Pedometer settings',
      depth: 3
    })

    .when('/geoloc', {
      templateUrl: 'partials/geoloc.html',
      controller:  'GeolocCtrl',
      title:       'Geolocation',
      depth: 2
    })

    .otherwise({redirectTo: '/list'});
  }]);


  cordovapp.controller('ListCtrl', [function() {
  }]);

})();
