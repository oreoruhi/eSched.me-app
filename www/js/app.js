// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'eSchedMe' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('eSchedMe', ['ionic', 'backand', 'eSchedMe.controllers', 'eSchedMe.services', 'ionic-toast', 'ngCookies', 'ion-floating-menu', 'ngCordova'])

    .run(function ($ionicPlatform, Backand) {
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

            var isMobile = !(ionic.Platform.platforms[0] == "browser");
            Backand.setIsMobile(isMobile);
            Backand.setRunSignupAfterErrorInSigninSocial(true);
        });
    })

  .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
      BackandProvider.setAppName('esckedme');
      BackandProvider.setSignUpToken('285fc2ca-7fee-4626-9ad2-d0659ec9c18a');
      BackandProvider.setAnonymousToken('5c9e5dfc-4cea-40a2-8842-d3338432e7fa');

      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');

      $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl as signup'
      })

      .state('login', {
        cache: false,
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
        cache: false,
        url: '/dashboard',
        abstract: true,
        templateUrl: 'templates/dashboard.html',
        controller: 'DataCtrl as dataCtrl',
        data: {
         role: 'User'
        }
      })

      .state('dashboard.newsfeed', {
        url: '/newsfeed',
        views: {
          'menuContent': {
            templateUrl: 'templates/newsfeed.html'
          }
        }
      })

      .state('dashboard.profile', {
        cache: false,
        url: '/profile/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html'
          }
        }
      })

      .state('dashboard.project', {
        url: '/project',
        views: {
          'menuContent': {
            templateUrl: 'templates/project.html'
          }
        }
      })

      .state('dashboard.group', {
        url: '/group',
        views: {
          'menuContent': {
            templateUrl: 'templates/group.html'
          }
        }
      })

      .state('dashboard.submodule', {
        cache: false,
        url: '/submodule/:id',
        controller: 'SubmoduleCtrl',
        controlerAs: 'ctrl',
        views: {
          'menuContent': {
            templateUrl: 'templates/submodule.html'
          }
        }
      })

      .state('dashboard.timeline', {
        url: '/timeline',
        controller: 'MapCtrl',
        views: {
          'menuContent': {
            templateUrl: 'templates/timeline.html'
          }
        }
      })

      .state('dashboard.module', {
        cache: false,
        url: '/module',
        controller: 'ModuleCtrl as moduleCtrl',
        params: {
          project: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/module.html'
          }
        }
      })

      .state('dashboard.friend', {
        cache: false,
        url: '/friend',
        views: {
          'menuContent': {
            templateUrl: 'templates/friend.html'
          }
        }
      })

      $urlRouterProvider.otherwise('/');

      $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($rootScope, $state, $cookieStore, LoginService, Backand, DataService) {

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
          Backand.getUserDetails()
            .then(function(result) {
              console.log(result);
              $cookieStore.put('userId', result.userId);
            });
          $state.go('dashboard.newsfeed');
        });

        $rootScope.$on(Backand.EVENTS.SIGNOUT, function(event, data) {
          //window.location.reload();
        });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name === 'login') {
                //signout();
            }
            if(toState.name === 'dashboard.newsfeed') {
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



