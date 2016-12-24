// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'eSchedMe' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('eSchedMe', [
  'ionic',
  'angular-jwt',
  'eSchedMe.controllers',
  'eSchedMe.services',
  'ionic-toast',
  'ion-floating-menu',
  'underscore',
  'ngCookies',
  'ngResource',
  'ngCordova'
  ])

  .run(function ($ionicPlatform, $http) {
      $ionicPlatform.ready(function () {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

          }
          //cordova.plugins.Keyboard.disableScroll(true)
          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleLightContent();
          }
      });
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('id_token')
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, jwtOptionsProvider) {

      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');

      jwtOptionsProvider.config({
        whiteListedDomains: [
          'api.diaz.tech',
          '192.168.0.10:8100'
        ]
      });

      $httpProvider.interceptors.push('jwtInterceptor');

      $urlRouterProvider.otherwise('/');
    })

    .run(function ($rootScope, $state, $cookieStore, LoginService, $ionicHistory) {

        function unauthorized() {
            console.log("User is unauthorized. Sending to login page.");
            $state.go('login');
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          if(toState.name == 'dashboard.module') {
            return;
          } else {
            $ionicHistory.nextViewOptions({
              disableBack: true,
              // disableAnimate: true
            });
          }
        });
    })
    .constant('API', {
      "URL": "http://localhost:3000"
    });



