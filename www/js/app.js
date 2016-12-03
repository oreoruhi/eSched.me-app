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


          $http.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('id_token')
      });
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, jwtOptionsProvider) {

      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');

      jwtOptionsProvider.config({
        toenGetter: function() {
          return window.localStorage.getItem('id_token');
        },
        whiteListedDomains: [
          '192.168.0.10:3000',
          '192.168.0.10:8100'
        ]
      });

      $httpProvider.interceptors.push('jwtInterceptor');

      $urlRouterProvider.otherwise('/');
    })

    .run(function ($rootScope, $state, $cookieStore, LoginService, DataService) {

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

        // $rootScope.$on(Backand.EVENTS.SIGNIN, function (event, data) {
        //   $rootScope.$broadcast('authorized');
        //   Backand.getUserDetails()
        //     .then(function(result) {
        //       console.log(result);
        //       window.localStorage.setItem('userId', result.userId);
        //     });
        //   $state.go('dashboard.newsfeed');
        // });

        // $rootScope.$on(Backand.EVENTS.SIGNOUT, function(event, data) {
        //   //window.location.reload();
        // });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            // if (toState.name === 'login') {
            //     //signout();
            // }
            // // if(toState.name === 'dashboard.newsfeed') {
            // //   if(toState.data.role !== Backand.getUserRole()) {
            // //     event.preventDefault();
            // //     $state.go('login');
            // //   }
            // // }
            // else if (toState.name != 'login' && Backand.getToken() === undefined) {
            //     unauthorized();
            // }
        });
    })
    .constant('API', {
      "URL": "http://192.168.0.10:3000"
    })



