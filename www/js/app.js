// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'backand', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

    .run(function ($ionicPlatform, Backand) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            var isMobile = !(ionic.Platform.platforms[0] == "browser");
            Backand.setIsMobile(isMobile);
            Backand.setRunSignupAfterErrorInSigninSocial(true);
        });
    })

  .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
      BackandProvider.setAppName('dodongx');
      BackandProvider.setSignUpToken('a7a341b4-d4b3-46b1-a786-c7c4c1776719');
      BackandProvider.setAnonymousToken('047a5ffa-e1ee-457e-8141-a6f3ab54d8ca');
      BackandProvider.runSigninAfterSignup(true);

      $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl as signup'
      })

      .state('login', {
        url: '/',
        templateUrl: 'templates/signin.html',
        controller: 'LoginCtrl as login'
      })

      .state('signup-form', {
        url: '/signup-form',
        templateUrl: 'templates/signup-form.html',
        controller: 'SignUpCtrl as vm'
      })

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'DataCtrl as dataCtrl',
        data: {
          role: 'User'
        }
      })



      $urlRouterProvider.otherwise('/');

      $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($rootScope, $state, LoginService, Backand, DataService) {

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

        $rootScope.$on(Backand.EVENTS.SIGNIN, function (event, data) {
          $rootScope.$broadcast('authorized');
          $state.go('dashboard');
        });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name === 'login') {
                signout();
            }
            if(toState.name === 'dashboard') {
              if(toState.data.role !== Backand.getUserRole()) {
                event.preventDefault();
                $state.go('login');
              }
            }
            else if (toState.name != 'login' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });
    })


